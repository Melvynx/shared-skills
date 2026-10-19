# shared-skills

Standalone skills for Claude Code (and any agent that reads `SKILL.md`), each one self-contained: install only the one you need.

| skill | what it does | install |
|---|---|---|
| [vox](skills/vox) | One photo into a cinematic paper-collage animation in the style of Vox documentaries (Codex layers, halftone cut-out, MP4). | `npx skills add Melvynx/shared-skills --skill vox` |

## Install

In your project folder:

```bash
npx skills add Melvynx/shared-skills --skill <name>
```

Add `-a claude-code` to install for Claude Code only. Each skill's own README lists what it needs.

## More

- Video editing skills: [Melvynx/video-agent-skills](https://github.com/Melvynx/video-agent-skills)
