# shared-skills

Standalone skills for Claude Code (and any agent that reads `SKILL.md`), each one self-contained: install only the one you need.

| skill | what it does | install |
|---|---|---|
| [vox](skills/vox) | One photo into a cinematic paper-collage animation in the style of Vox documentaries (Codex layers, halftone cut-out, MP4). | `npx skills add Melvynx/shared-skills --skill vox` |
| [limite](skills/limite) | Stop burning your Claude Code limit: two Haiku agents (search and chores) take the easy work, Opus keeps planning and debugging. | `npx skills add Melvynx/shared-skills --skill limite -g` |
| [anti-vibecode](skills/anti-vibecode) | Bans the 43 tells of a vibecoded website (purple gradient, bento, liquid glass, sparkles, « Most popular », no legal pages, Create Next App tab) and scans a project for them. | `npx skills add Melvynx/shared-skills --skill anti-vibecode -g` |
| [better](skills/better) | Improves one screen at a time across accessibility, layout, writing, typography, colors and UI polish, then verifies it. | `npx skills add Melvynx/shared-skills --skill better -g` |
| [ameliore-systeme](skills/ameliore-systeme) | Claude Code improves itself: reads your session history, reports what Claude gets wrong, the skills to create and the tasks to automate, then writes the one you pick. | `npx skills add Melvynx/shared-skills --skill ameliore-systeme -g` |

## Install

In your project folder:

```bash
npx skills add Melvynx/shared-skills --skill <name>
```

Add `-a claude-code` to install for Claude Code only. Each skill's own README lists what it needs.

## More

- Video editing skills: [Melvynx/video-agent-skills](https://github.com/Melvynx/video-agent-skills)
