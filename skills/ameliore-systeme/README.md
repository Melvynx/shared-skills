# Améliore Système : Claude Code qui s'améliore tout seul

Chaque conversation que tu as avec Claude Code est sauvegardée sur ton ordinateur, dans `~/.claude/projects/`. Ce skill lit cet historique et te dit ce que Claude rate, ce que tu répètes, les skills à créer et les tâches que tu refais chaque jour. Puis il écrit pour toi le skill ou l'automatisation que tu choisis.

## En 3 étapes

1. **Ajoute le skill à Claude**, pour tous tes projets :

   ```bash
   npx skills add Melvynx/shared-skills --skill ameliore-systeme -g -a claude-code
   ```

2. **Lance-le** dans Claude Code :

   ```text
   /ameliore-systeme
   ```

   Ajoute un nombre pour lire plus de jours : `/ameliore-systeme 14` (7 par défaut).

3. **Choisis ce qu'il construit** : une règle pour ton `CLAUDE.md`, un nouveau skill, ou une automatisation.

## Ce que fait le skill

- `scripts/digest.mjs` lit tes sessions des derniers jours et garde seulement tes messages, les commandes et les erreurs d'outil, dans un seul fichier court.
- Claude en sort un rapport en 4 parties : ce que Claude fait mal, ce que tu répètes, les skills à créer, les tâches répétées à automatiser, avec les dates et les dossiers.
- Il écrit ce que tu choisis, toujours après ton accord.

Rien ne quitte ton ordinateur, et aucun fichier de session n'est modifié. Lance-le une ou deux fois par semaine.
