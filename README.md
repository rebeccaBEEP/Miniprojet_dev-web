#  Générateur de besoins en protéines

Une application web interactive développée en **React js** permettant de générer dynamiquement un tableau de besoins journaliers en protéines en fonction du poids et des objectifs sportifs de l'utilisateur.

---

##  Description

Cette application permet à l'utilisateur de :
- Sélectionner un ou plusieurs objectifs sportifs
- Définir un poids minimum et maximum
- Choisir le nombre de lignes à afficher
- Générer automatiquement un tableau de besoins en protéines (en g/jour)
- Exporter le tableau au format CSV

---

## Installation

### Prérequis
- [Node.js](https://nodejs.org/) version 18 ou supérieure
- npm (inclus avec Node.js)

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/<ton-username>/<ton-repo>.git
cd <ton-repo>
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir l'application**

Rendez-vous sur [http://localhost:5173](http://localhost:5173) dans votre navigateur.

---

##  Explication des composants

### `src/types.ts`
Définit les types TypeScript utilisés dans toute l'application :
- `ObjectifId` — identifiant unique de chaque objectif
- `Objectif` — structure d'un objectif (id, label, ratios min/max)
- `Parametres` — paramètres saisis par l'utilisateur

### `src/App.tsx`
Composant racine de l'application. Il joue le rôle de chef d'orchestre :
- Stocke les paramètres et objectifs dans son state
- Passe la fonction `handleGenerer` à `ControlPanel`
- Affiche `ProteinTable` et `ExportCSV` uniquement après génération

### `src/components/ControlPanel.tsx`
Panneau de contrôle de l'application. Il gère :
- Les cases à cocher pour sélectionner les objectifs
- Les inputs pour le poids minimum, maximum et le nombre de lignes
- La validation des champs (erreurs affichées en rouge, bouton désactivé si invalide)

### `src/components/ProteinTable.tsx`
Composant d'affichage du tableau généré dynamiquement :
- Calcule les poids à afficher en les répartissant uniformément entre le min et le max
- Génère une colonne par objectif sélectionné
- Affiche pour chaque cellule la plage de besoins en g/jour (ex: `60 – 80 g/jour`)

### `src/components/ExportCSV.tsx`
Composant permettant d'exporter le tableau en fichier `.csv` :
- Génère le contenu CSV à partir des mêmes données que le tableau
- Déclenche le téléchargement automatique du fichier `besoins_proteines.csv`

---

##  Recommandations nutritionnelles utilisées

| Objectif | Besoin en protéines |
|---|---|
| Sédentaire | 0,8 – 1,0 g/kg/jour |
| Endurance | 1,2 – 1,6 g/kg/jour |
| Conservation de la masse musculaire | 1,6 – 1,8 g/kg/jour |
| Prise de masse musculaire | 1,8 – 2,2 g/kg/jour |

---

##  Technologies utilisées

- [React](https://react.dev/) — bibliothèque Javascript
- [TypeScript](https://www.typescriptlang.org/) — typage statique
