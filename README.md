# GA2D - Site Web Architecture

## Corrections Effectuées

### ✅ 1. Identité Visuelle - Couleurs
- **Palette** : Noir et Blanc uniquement (suppression des couleurs ocre/teal)
- **Logo** : Recréé fidèlement avec le format GA2D + ARCHITECTES

### ✅ 2. Équipe Réelle Complète
**Fondatrices:**
- Andrée Diop Depret - Architecte DPLG, Fondatrice associée
- Eric Mulot - Architecte DPLG, Associé Gérant

**Chefs de Projet:**
- Nelson Nkonmeneck
- Maïlys Tham
- Ulrich B. Tchouante K. (Architecte Urbaniste DEIAU)

**Support:**
- François Gomis (Suivi de chantier)
- Simon Manga, Madeleine Cisse, Dahirou Kane, Mafal Sarr (Dessinateurs)
- Alpha Ba (Intendant), Djibril Drame (Coursier)

**Anciens collaborateurs** : Liste complète depuis 1996

### ✅ 3. Suppression Blog
- Section Blog/Actualités complètement supprimée
- Navigation mise à jour (Accueil, Agence, Projets, Équipe, Contact)

### ✅ 4. Contact - Informations Réelles
```
GA2D
Point E rue PE08
BP 25658 Dakar Fann
Sénégal

Téléphone: (+221) 33 825 89 50
Email: contact@ga2d.com
```

### ✅ 5. Navigation Fonctionnelle
Tous les boutons mènent aux sections :
- **Logo** → Accueil
- **Accueil** → Hero section
- **Agence** → Section présentation + méthodologie
- **Projets** → Portfolio avec filtres
- **Équipe** → Tous les membres
- **Contact** → Formulaire + coordonnées
- **CTA "Prendre rendez-vous"** → Section contact
- **Footer** → Liens vers toutes les sections

### ✅ 6. Contenu Agence
- Texte réel de présentation
- Méthodologie complète (Écouter, Comprendre, Concevoir, Construire)
- Histoire depuis 1996

## Structure du Site

```
├── Accueil (Hero + Slider)
├── Stats (28+ ans, 150+ projets...)
├── Agence
│   ├── Présentation
│   ├── Valeurs
│   └── Méthodologie
├── Projets (Portfolio filtrable)
├── Équipe (Membres complets)
├── Témoignages
├── Contact (Formulaire + Coordonnées)
└── Footer
```

## Fonctionnalités

- ✓ Navigation fixe avec détection de section active
- ✓ Carrousel automatique sur la page d'accueil
- ✓ Filtres de projets par catégorie
- ✓ Chargement progressif des projets (Bouton "Voir plus")
- ✓ Modal détaillée pour chaque projet
- ✓ Formulaire de contact fonctionnel
- ✓ Design responsive (mobile, tablette, desktop)
- ✓ Animations Framer Motion fluides

## Build

```bash
npm run build
```

Le fichier final est : `dist/index.html` (410 kB)
