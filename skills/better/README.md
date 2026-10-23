# Better : un écran meilleur, corrigé et vérifié

Un skill pour Claude Code qui améliore une interface pour de vrai : il inspecte un écran ou un parcours, trouve ce qui cloche (accessibilité, layout, textes, typo, couleurs, finitions UI), corrige tout ce qu'il trouve et vérifie le résultat dans la même tâche.

## En 3 étapes

1. **Ajoute le skill à Claude**, pour tous tes projets :

   ```bash
   npx skills add Melvynx/shared-skills --skill better -g -a claude-code
   ```

2. **Lance-le** sur l'écran à améliorer :

   ```text
   /better la page de pricing
   ```

3. **Pour un audit sans modification**, dis-le : `/better audit la page d'accueil`.

## Ce que fait le skill

- Six guides dans `references/` (accessibilité, layout, écriture, typographie, couleurs, UI), chargés dans cet ordre.
- Chaque problème cité avec son `fichier:ligne`, classé HIGH / MEDIUM / LOW, puis corrigé.
- Les états vides, de chargement, d'erreur et les petits écrans sont vérifiés aussi.

À coupler avec [anti-vibecode](../anti-vibecode) pour enlever d'abord les 43 signes d'un site fait par l'IA.
