#!/usr/bin/env node
// Turns the Claude Code session history (~/.claude/projects/**/*.jsonl) into one short Markdown digest:
// for each session of the last N days, its folder, date, title, the commands used, the tool errors
// and every message the user typed. Reads only, writes only the --out file (or stdout).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const days = Number(opt('days', '7'));
const root = opt('root', path.join(os.homedir(), '.claude', 'projects'));
const out = opt('out', '');
const budget = Number(opt('max-chars', '180000'));
const since = Date.now() - days * 86400000;

if (!fs.existsSync(root)) {
  console.error(`No session history at ${root}`);
  process.exit(1);
}

const files = [];
for (const dir of fs.readdirSync(root)) {
  const full = path.join(root, dir);
  if (!fs.statSync(full).isDirectory()) continue;
  for (const f of fs.readdirSync(full)) {
    if (!f.endsWith('.jsonl')) continue;
    const p = path.join(full, f);
    const st = fs.statSync(p);
    if (st.mtimeMs >= since) files.push({ p, mtime: st.mtimeMs });
  }
}
files.sort((a, b) => a.mtime - b.mtime);

const skip = /^<(local-command|system-reminder|command-message|user-prompt-submit-hook|task-notification|bash-|ide_)/;
const sessions = [];
for (const { p } of files) {
  const s = { cwd: '', title: '', start: '', end: '', prompts: [], commands: {}, errors: 0, tools: 0 };
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    if (!line) continue;
    let e;
    try { e = JSON.parse(line); } catch { continue; }
    if (e.type === 'custom-title' && e.customTitle) s.title = e.customTitle;
    if (e.type === 'summary' && e.summary && !s.title) s.title = e.summary;
    if (e.type !== 'user' && e.type !== 'assistant') continue;
    if (e.timestamp && Date.parse(e.timestamp) < since) continue;
    if (e.cwd) s.cwd = e.cwd;
    if (e.timestamp) { s.start ||= e.timestamp; s.end = e.timestamp; }
    const c = e.message?.content;
    if (e.type === 'assistant') {
      if (Array.isArray(c)) s.tools += c.filter((x) => x.type === 'tool_use').length;
      continue;
    }
    if (e.isMeta) continue;
    const parts = typeof c === 'string' ? [{ type: 'text', text: c }] : Array.isArray(c) ? c : [];
    for (const part of parts) {
      if (part.type === 'tool_result') { if (part.is_error) s.errors++; continue; }
      if (part.type !== 'text' || !part.text) continue;
      const text = part.text.trim();
      const cmd = text.match(/<command-name>\/?([^<]+)<\/command-name>/);
      if (cmd) {
        s.commands[cmd[1]] = (s.commands[cmd[1]] || 0) + 1;
        const a = text.match(/<command-args>([\s\S]*?)<\/command-args>/);
        if (a && a[1].trim()) s.prompts.push(`/${cmd[1]} ${a[1].trim()}`);
        continue;
      }
      if (skip.test(text) || text.startsWith('[Request interrupted') || text.startsWith('This session is being continued')) continue;
      s.prompts.push(text);
    }
  }
  if (s.prompts.length) sessions.push(s);
}
sessions.sort((a, b) => a.start.localeCompare(b.start));

const render = (limit) => {
  const lines = [`# Sessions Claude Code des ${days} derniers jours`, '', `${sessions.length} sessions.`, ''];
  for (const s of sessions) {
    const cmds = Object.entries(s.commands).map(([k, v]) => `/${k}${v > 1 ? ` x${v}` : ''}`).join(', ');
    lines.push(`## ${s.start.slice(0, 16).replace('T', ' ')} · ${s.cwd || '?'}${s.title ? ` · ${s.title}` : ''}`);
    lines.push(`${s.prompts.length} messages, ${s.tools} outils, ${s.errors} erreurs d'outil${cmds ? `, commandes : ${cmds}` : ''}`);
    for (const t of s.prompts) {
      const one = t.replace(/\s+/g, ' ');
      lines.push(`- ${one.length > limit ? `${one.slice(0, limit)}…` : one}`);
    }
    lines.push('');
  }
  return lines.join('\n');
};

let limit = 600;
let md = render(limit);
while (md.length > budget && limit > 80) { limit = Math.floor(limit * 0.7); md = render(limit); }
if (md.length > budget) md = `${md.slice(0, budget)}\n\n(tronqué : relance avec --days plus petit)\n`;

if (out) { fs.writeFileSync(out, md); console.log(`${out}: ${sessions.length} sessions, ${md.length} caractères`); }
else process.stdout.write(md);
