# FootDeals — checklist avant lancement public

État : le site fonctionne techniquement, mais le lancement monétisé doit rester bloqué tant que les points externes ci-dessous ne sont pas complétés.

## 1. Identité de l’éditeur / entreprise

À compléter avant de passer `legalReady` à `true` :

- nom ou dénomination de l’entreprise / éditeur ;
- adresse d’établissement ;
- au moins des coordonnées de contact facilement accessibles ;
- numéro d’entreprise BCE si l’activité est exercée comme entreprise ;
- numéro de TVA si applicable.

Références officielles Belgique :
- https://economie.fgov.be/fr/themes/line/commerce-electronique/vente-par-internet/site-dentreprise-et-comptes
- https://economie.fgov.be/fr/themes/entreprises/guidance/pratiques-commerciales/obligations-dinformation-dans/questions-frequemment-posees

Ne pas inventer de données et ne pas utiliser les coordonnées d’une autre personne ou entité sans qu’elle soit réellement l’éditeur / titulaire concerné.

## 2. Affiliation

FootDeals est déjà prêt techniquement pour recevoir des liens affiliés approuvés via `affiliate_url`.

Avant activation :

- obtenir l’approbation du programme / réseau ;
- utiliser uniquement un compte réellement éligible et détenu par son titulaire légitime ;
- ajouter uniquement des liens fournis ou générés par le programme approuvé ;
- ne jamais inventer un identifiant, tracking ID ou lien affilié ;
- conserver le lien marchand normal en secours.

Le site affiche déjà une information d’affiliation avant la sortie vers le marchand et sépare les clics affiliés des clics standards dans les statistiques.

## 3. Publicité / Snapchat

Une communication commerciale ou sponsorisée doit être clairement identifiable comme telle. Pour toute Story ou publication contenant une promotion rémunérée ou un lien affilié, utiliser une mention explicite adaptée, par exemple `Publicité` ou `Lien affilié`, selon le cas.

Références officielles Belgique :
- https://economie.fgov.be/fr/themes/ventes/publicite/vous-etes-createur-de-contenu
- https://news.economie.fgov.be/267409-influenceurs-et-ia-la-publicite-reste-trop-rarement-indiquee/

## 4. Données / confidentialité

FootDeals doit continuer à limiter la collecte au nécessaire et expliquer ce qui est collecté dans la page Confidentialité. Si de futurs outils publicitaires ou cookies non essentiels sont ajoutés, vérifier les obligations de consentement avant leur activation.

## 5. Conditions de lancement dans FootDeals

Ne passer `launch` à `true` que lorsque :

1. les mentions légales contiennent des informations réelles et complètes ;
2. `legalReady` est confirmé ;
3. les liens affiliés utilisés sont approuvés ;
4. un test final est effectué sur accueil, filtres, favoris, redirections, admin et statistiques ;
5. la communication de lancement respecte la transparence publicitaire.

## État actuel

- Site public : opérationnel.
- Netlify Functions : déployées.
- Redirections marchands : opérationnelles.
- Support `affiliate_url` : prêt.
- Statistiques affilié / standard : prêtes.
- Approbations affiliation : externe, à obtenir.
- Données légales éditeur / entreprise : externes, à compléter avec des informations réelles.
- Promotion Snapchat : à lancer seulement après les deux points précédents.
