# Zadig&Voltaire — App concept (planche UX/UI)

Planche d'architecture de l'application mobile : 34 écrans répartis en 11 espaces
(Home, Shop, Stories, Drops, Collections, Looks, Expériences, Concierge, Mon Zadig,
Boutiques, CRM), l'arborescence content-to-commerce, la navigation principale,
les parcours types et le calendrier éditorial des notifications.

- `index.html` : la planche (HTML/CSS/SVG, polices embarquées dans `fonts/`).
- `export/zadig-voltaire-app-concept-hd.jpg` : rendu 9760 × 8870 px.
- `export/zadig-voltaire-app-concept-preview.jpg` : aperçu léger.

## Démo interactive — `app/index.html`

Prototype cliquable de l'application, construit sur le même design system que la planche
(HTML/CSS/JS sans dépendance, à ouvrir directement dans un navigateur).

- **Navigation** : barre à 5 entrées (Home, Shop, Stories, Drops, Mon Zadig), recherche
  universelle, bouton Concierge flottant, historique avec retour.
- **Commerce** : catalogue filtrable, fiche produit (galerie, coloris, tailles, stock boutique,
  storytelling), panier, paiement express, confirmation, suivi de commande qui avance tout seul.
- **Contenu** : Journal par rubriques, articles avec « Ce qu'elle porte », playlist, stories
  plein écran, film de collection, moodboard.
- **Drops** : reveal progressif, compte à rebours en direct, ouverture du drop, stock qui baisse,
  une pièce par membre, contenus post-drop.
- **Looks** : lookbook filtrable, shop the look avec sélection des pièces.
- **Expériences** : agenda, RSVP, invitation nominative avec QR code.
- **Concierge** : chat qui répond aux intentions (look, taille, commande, boutique, contenu, drop).
- **Mon Zadig** : club, wishlist (pièces, looks, stories), préférences, boutiques, prise de RDV.
- **CRM** : notifications push simulées (bannière), inbox, préférences d'opt-in.

Sur ordinateur, un panneau latéral lance les parcours content-to-commerce (A à E), déclenche des
push et ouvre le drop. Sur mobile, l'app s'affiche en plein écran. L'état (panier, wishlist, RSVP,
préférences) est mémorisé dans le navigateur ; « Réinitialiser » remet la démo à zéro.

Test automatisé (Chromium) : `node app/test.mjs <dossier-captures>`.

Régénérer les exports (Chromium via Playwright) :

```
cd zadig-voltaire
node shot.mjs index.html export/zadig-voltaire-app-concept-hd.jpg 4880 3000 2 1
```

Les visuels sont des illustrations générées en SVG ; les noms de produits,
d'artistes et d'événements sont fictifs.
