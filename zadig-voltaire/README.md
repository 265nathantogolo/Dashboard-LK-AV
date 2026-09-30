# Zadig&Voltaire — App concept (planche UX/UI)

Planche d'architecture de l'application mobile : 34 écrans répartis en 11 espaces
(Home, Shop, Stories, Drops, Collections, Looks, Expériences, Concierge, Mon Zadig,
Boutiques, CRM), l'arborescence content-to-commerce, la navigation principale,
les parcours types et le calendrier éditorial des notifications.

- `index.html` : la planche (HTML/CSS/SVG, polices embarquées dans `fonts/`).
- `export/zadig-voltaire-app-concept-hd.jpg` : rendu 9760 × 8870 px.
- `export/zadig-voltaire-app-concept-preview.jpg` : aperçu léger.

Régénérer les exports (Chromium via Playwright) :

```
cd zadig-voltaire
node shot.mjs index.html export/zadig-voltaire-app-concept-hd.jpg 4880 3000 2 1
```

Les visuels sont des illustrations générées en SVG ; les noms de produits,
d'artistes et d'événements sont fictifs.
