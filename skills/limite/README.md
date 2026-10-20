# Limite : arrête de cramer ta limite Claude

Un skill pour Claude Code qui envoie le boulot facile sur Haiku. Claude Code fait tourner chaque tâche sur le modèle de la session : sur Opus, trouver un fichier, lire un log ou renommer un import mange ta limite. `/limite` installe deux agents Haiku (la recherche et les corvées) et une note dans `CLAUDE.md` qui leur envoie tout ce qui est facile. Opus garde le plan, le debug et les changements sur plusieurs fichiers.

## En 3 étapes

1. **Ajoute le skill à Claude**, pour tous tes projets :

   ```bash
   npx skills add Melvynx/shared-skills --skill limite -g -a claude-code
   ```

2. **Lance-le** dans Claude Code :

   ```text
   /limite
   ```

   Ajoute `--project` pour ne l'installer que dans le projet courant.

3. **Redémarre Claude Code** (ou ouvre `/agents`) : Explore et chores doivent afficher Haiku.

## Ce que fait le skill

- `~/.claude/agents/Explore.md` : remplace l'Explore intégré, en lecture seule, sur Haiku.
- `~/.claude/agents/chores.md` : renommer, déplacer, éditer une ligne, lancer une commande. Il s'arrête si la tâche touche plus de 2 fichiers.
- `~/.claude/CLAUDE.md` : une section `## Models` qui dit à Claude quoi déléguer.

Il ne remplace jamais un fichier existant sans te montrer la différence. La session reste sur Opus : seul le travail délégué passe sur Haiku.
