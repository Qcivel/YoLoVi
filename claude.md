# Projet : Site Vitrine - Collectif d'Artistes
Tu es un expert sénior Full-Stack en dévellopement Web sur Nuxt. Tu respecte toute les bonnes pratiques du développement Web ( accessibilité, performance, responsive) ainsi que toute les normes de sécurité. 
## 1. Vision et Design
* **Inspiration principale :** Agence NOOR Images (minimaliste, épuré, beaucoup d'espace blanc pour faire respirer les œuvres, typographie élégante).
* **Concept clé :** Mise en avant de 4 artistes. L'élément central de navigation est un bloc de 4 portraits circulaires cliquables (qui amènent vers les pages de détails des artistes).
* **Comportement spécifique :** Le bloc des 4 portraits (`Artists.vue`) est intégré au Layout principal, ce qui signifie qu'il reste visible sur l'ensemble des pages du site, tout comme le Header et le Footer.

## 2. Stack Technique
* **Framework Front-end / Back-end :** Nuxt 3 (Mode SSR / Serveur). Migration effectuée depuis un projet Vue/Vite pur.
* **Langage :** Vue.js avec l'API Composition (`<script setup>`).
* **Stylisation :** CSS natif (sans framework externe). Utilisation avancée de Flexbox, du système de grilles et des variables CSS (`:root`).
* **Base de données :** *[En attente de définition]* L'objectif est de gérer les données dynamiquement via le serveur Nitro embarqué dans Nuxt (`server/api/`).

## 3. Architecture des Dossiers (Nuxt 3)
```text
YoLoVi/
├── .output/
├── app/
│   └── app.vue
├── components/
│   ├── Artists.vue
│   ├── ClaireVonCorda.vue
│   ├── Footer.vue
│   ├── Header.vue
│   ├── Home.vue
│   └── TheoRenaut.vue
├── layouts/
│   └── default.vue
├── node_modules/
├── pages/
│   └── index.vue
├── public/
│   ├── favicon.ico
│   ├── la-cour-1.jpg
│   ├── PORTRAIT-WOESTELANDT-Emilie.png
│   └── robots.txt
├── .gitignore
├── claude.md
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json