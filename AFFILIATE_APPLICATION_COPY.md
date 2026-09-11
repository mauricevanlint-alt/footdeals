# FootDeals — dossier prêt pour candidatures d’affiliation

Ce document sert à préparer les candidatures officielles aux programmes partenaires. Il ne doit être utilisé que par le titulaire réel et éligible du compte publisher, avec des informations exactes.

## Présentation courte du site

FootDeals est un site francophone dédié aux bons plans football en Belgique. Il sélectionne des offres sur les maillots, crampons, vêtements et équipements, puis affiche clairement le prix, la remise, le marchand et la date de vérification avant la redirection vers la boutique.

## Présentation longue

FootDeals aide les supporters et joueurs de football à trouver rapidement des offres intéressantes sans parcourir plusieurs boutiques. Le site met en avant une sélection éditoriale limitée, classe les offres par catégorie, permet la recherche, les filtres et les favoris, et conserve une présentation transparente du marchand et du prix. Les achats et paiements sont réalisés directement chez le marchand. FootDeals ne se présente pas comme le vendeur des produits.

## Audience visée

- Supporters de football francophones
- Joueurs amateurs
- Acheteurs de maillots, crampons et équipement
- Principalement Belgique / francophonie

## Type de publisher

Site de contenu / comparateur éditorial de bons plans football.

## Méthodes de promotion prévues

- Référencement naturel du site
- Partage éditorial sur les réseaux sociaux
- Liens directs vers des offres vérifiées
- Pages catégories et sélections de produits

Ne pas déclarer de méthode publicitaire qui n’est pas réellement utilisée.

## Transparence affiliation

FootDeals possède une page dédiée à l’affiliation. Lorsqu’un lien affilié approuvé sera utilisé, l’interface peut l’indiquer et la redirection serveur privilégiera automatiquement le lien affilié tout en conservant un lien marchand normal en secours.

## Informations techniques utiles

- Site : https://footdeals.netlify.app
- Langue : français (Belgique)
- Catégories : maillots, crampons, vêtements, équipement
- Application installable (PWA)
- Suivi des clics côté serveur
- Page de confidentialité
- Page d’affiliation
- Mentions légales

## Nike

Nike indique que les candidatures à son programme d’affiliation sont examinées individuellement. Le site doit donc être présenté tel qu’il existe réellement : design finalisé, contenu football cohérent et liens propres.

Texte court possible pour la candidature :

> FootDeals est un site francophone de bons plans football destiné principalement au public belge. Nous sélectionnons et vérifions des offres de chaussures, maillots, vêtements et équipements de football, puis redirigeons les visiteurs vers le marchand pour l’achat. Notre objectif est de proposer une expérience éditoriale claire, avec prix, remise et fraîcheur de l’offre visibles avant le clic.

## adidas BE

Pour une candidature au programme adidas BE, utiliser la même présentation du site et sélectionner uniquement les méthodes de promotion réellement utilisées.

Texte court possible :

> FootDeals est un site éditorial de bons plans football en français, avec une audience principalement belge. Les offres adidas sont présentées avec le prix, la remise, la catégorie et une date de vérification, puis l’utilisateur est redirigé vers adidas pour finaliser son achat.

## Avant d’envoyer une candidature

- Le titulaire du compte publisher doit être réellement éligible selon les conditions du réseau.
- Utiliser le vrai nom, la vraie identité et les vraies coordonnées du titulaire.
- Ne pas inventer de trafic, de ventes, d’âge, d’entreprise ou d’audience.
- Vérifier que FootDeals est accessible publiquement.
- Vérifier que les pages Affiliation, Confidentialité et Mentions légales sont accessibles.
- Ne jamais ajouter un identifiant de tracking qui n’a pas été fourni par le réseau.

## Après approbation

Pour chaque offre approuvée, renseigner :

```json
{
  "affiliate": true,
  "affiliate_url": "LIEN_FOURNI_PAR_LE_RESEAU"
}
```

FootDeals utilisera alors automatiquement le lien affilié dans `/out/:id`.