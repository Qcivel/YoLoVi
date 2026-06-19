Act en tant qu'expert Front-End UI/UX spécialisé en Vue 3 / Nuxt 3, avec une forte sensibilité pour le design éditorial, minimaliste et orienté photographie.

Je développe actuellement un site vitrine pour un collectif d'artistes/photographes en Nuxt 3. Je veux entièrement harmoniser le visuel de mon site (Header, Layout, Page d'accueil et Pages Artistes) en m'inspirant directement de la direction artistique de cette page de l'agence NOOR Images : https://www.noorimages.com/on-revolution-road

### 🎨 L'ADN visuel cible (Inspiration NOOR) :
1. **Minimalisme radical & Whitespace :** Fond blanc pur ou noir pur, très épuré. Beaucoup d'espace vide (padding/margin généreux) pour laisser respirer les photos. Les œuvres sont les reines absolues.
2. **Typographie Éditoriale (Style Magazine/Documentaire) :** Titres forts et élégants (souvent une Serif raffinée ou une Sans-Serif très géométrique et fine), textes de paragraphes aérés, contrastes de tailles marqués mais subtils.
3. **Mises en page asymétriques ou blocs structurés :** Pas de fioritures, pas d'arrondis excessifs (sauf nos portraits ronds), pas d'ombres portées agressives. Tout se joue sur l'alignement, les lignes fines de séparation et la pureté des blocs.

### 🏗️ Ma structure de projet actuelle (Nuxt 3) :
* `layouts/default.vue` : Contient `<Header />`, `<Artists />` (le bloc des 4 portraits circulaires des artistes qui reste fixe partout), la zone `<slot />` pour le contenu des pages, et `<Footer />`.
* `pages/index.vue` : La page d'accueil (Présentation du projet).
* `components/` : Contient mes fichiers de pages actuels à styliser (`Home.vue`, `TheoRenaut.vue`, `ClaireVonCorda.vue`) ainsi que les composants structurels (`Header.vue`, `Footer.vue`, `Artists.vue`).
* J'ai également une grande image de banderole panoramique (très large mais peu haute, représentant un photographe face à l'océan au coucher du soleil) à intégrer proprement dans le Header ou en haut de la page d'accueil.

### 🛠️ Ce que je te demande :
1. **Variables CSS globales (`:root`) :** Propose-moi une palette de couleurs (couleurs de fond, texte, lignes) et un duo de polices (Google Fonts gratuites et élégantes) qui matchent avec le style NOOR.
2. **Refonte CSS pour le Layout et les composants fixes :** Rédige le CSS propre (en CSS natif/scoped) pour le `Header.vue` (incluant la banderole panoramique), le bloc `Artists.vue` (les 4 portraits) et le `Footer.vue`.
3. **Structure et CSS pour une page Artiste type (ex: `TheoRenaut.vue`) :** Propose-moi une mise en page "éditoriale" inspirée du lien de NOOR, mettant en scène le nom de l'artiste, sa biographie (texte aéré) et une intégration de ses photos de manière ultra-esthétique.

Génère-moi un code propre, moderne, entièrement responsive (Mobile-First), en utilisant Flexbox et CSS Grid. Ne me donne pas de framework externe (pas de Tailwind, pas de Bootstrap), uniquement du CSS pur bien structuré.

Voici mes fichiers actuels pour que tu puisses travailler dessus :
index.vue
main.css