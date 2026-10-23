# Anti-vibecode : ton site ne doit plus crier « fait par l'IA »

Un site généré par Claude sans direction finit toujours avec les mêmes 43 réflexes : dégradé violet sur noir, boutons indigo, bento, liquid glass, icône sparkles, compteurs qui défilent, trois prix avec « le plus populaire » au milieu, pas de mentions légales, et l'onglet qui s'appelle encore Create Next App. Ce skill transforme chacun de ces signes en règle, les retrouve dans ton code et les remplace par un vrai choix.

## En 3 étapes

1. **Ajoute le skill à Claude**, pour tous tes projets :

   ```bash
   npx skills add Melvynx/shared-skills --skill anti-vibecode -g -a claude-code
   ```

2. **Lance-le** dans Claude Code, avant de construire ton site :

   ```text
   /anti-vibecode
   ```

   Claude répond « 43 règles actives » et choisit une couleur, une police et une mise en page qui ne sont pas les réflexes de l'IA.

3. **Audite ou corrige** un site qui existe déjà :

   ```text
   /anti-vibecode audit
   /anti-vibecode fix
   ```

## Ce que fait le skill

- `references/signs.md` : les 43 signes, rangés par thème (couleurs, layout, icônes, typo, motion, contenu, ce qu'il manque), chacun avec comment le repérer et quoi faire à la place.
- `scripts/scan.mjs` : un scanner sans dépendance (Node 18+) qui trouve 37 des 43 signes dans le code, avec le fichier et la ligne. Les 6 autres se vérifient à l'œil, le skill te dit lesquels.
- `fix` corrige du plus visible au moins visible, crée les pages légales manquantes avec des champs `TODO` (jamais de fausses infos), et relance le scan pour montrer l'avant / après.

Tu peux aussi lancer le scan seul : `node <dossier du skill>/scripts/scan.mjs <ton projet>`.

## Pour aller plus loin

- [Impeccable](https://github.com/pbakaus/impeccable) (`npx impeccable install`) : le design frontend de production, de la marque aux finitions.
- [better](../better) : améliore un écran à la fois (accessibilité, layout, textes, typo, couleurs) puis vérifie le résultat.
