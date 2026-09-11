# FootDeals — préparation affiliation

État : le site est prêt techniquement à utiliser des liens d'affiliation approuvés, sans casser les liens marchands normaux.

## Marchands actuellement présents

- Nike : offres 101 à 106
- adidas : offres 107 à 112

## Réseaux / programmes repérés

- Nike : programme d'affiliation officiel Nike, candidature via CJ Affiliate. L'acceptation est manuelle et dépend notamment de la qualité du site, de l'audience et de l'adéquation avec la marque.
- adidas Belgique : programme adidas BE sur Awin, identifiant programme 77000. Le programme indique une fenêtre d'attribution de 30 jours et des commissions variables selon le type de vente / publisher.

## Intégration FootDeals

Les données peuvent maintenant contenir :

```json
{
  "url": "https://www.marchand.be/produit",
  "affiliate_url": "https://lien-affilie-approuve.example/...",
  "affiliate": true
}
```

La redirection `/out/:id` utilise `affiliate_url` lorsqu'il existe ; sinon elle conserve automatiquement `url`. Cela permet de garder FootDeals fonctionnel avant l'approbation des programmes.

L'import administrateur valide et nettoie également `affiliate_url` avant stockage.

## À respecter

- Ne jamais inventer un lien affilié ni un identifiant de tracking.
- Ne jamais déclarer une affiliation avant approbation du marchand/réseau.
- Respecter les règles publicitaires, la transparence et les conditions propres à chaque programme.
- Les comptes publisher sont contractuels : utiliser uniquement un compte détenu par une personne ou entité réellement éligible selon les conditions du réseau, sans fausse déclaration d'âge ou d'identité.

## Prochaine action externe

Obtenir l'approbation publisher, puis coller les liens affiliés approuvés dans `affiliate_url`. Aucun changement de l'interface publique n'est nécessaire pour activer la redirection.
