<template>
  <div class="expositions-page">
    <header class="page-hero">
      <span class="page-label">Le collectif</span>
      <h1>Expositions</h1>
      <p class="page-intro">Retrouvez ici les prochains temps forts où découvrir le travail du collectif — dates et lieux à confirmer prochainement.</p>
    </header>

    <section class="expositions-list" aria-label="Prochaines expositions">
      <article
        v-for="expo in expositions"
        :key="expo.id"
        class="exposition-row"
      >
        <div class="exposition-row__media">
          <img :src="expo.image" :alt="expo.title">
        </div>

        <div class="exposition-row__content">
          <span class="exposition-dates">{{ expo.dates }}</span>
          <h2 class="exposition-title">{{ expo.title }}</h2>
          <span class="exposition-location">{{ expo.location }}</span>
          <p class="exposition-desc">{{ expo.description }}</p>
          <NuxtLink to="/contact" class="exposition-cta">En savoir plus →</NuxtLink>
        </div>
      </article>
    </section>

    <p class="expositions-note">
      D'autres dates seront annoncées prochainement — suivez le collectif pour ne rien manquer.<br>
      <a href="#louer-une-exposition" class="expositions-jump">Vous êtes un lieu et souhaitez accueillir une exposition ? →</a>
    </p>

    <hr class="expositions-divider">

    <section id="louer-une-exposition" class="louer-section" aria-label="Louer une exposition">
      <header class="louer-section__intro">
        <span class="page-label">Vous êtes un lieu</span>
        <h2>Louer une exposition</h2>
        <p class="page-intro">Mairies, médiathèques, entreprises, galeries — le collectif propose ses séries photographiques en location clé en main, prêtes à être accrochées.</p>
      </header>

      <div class="louer-included">
        <h3 class="section-title">Ce qui est inclus</h3>
        <ul class="included-list">
          <li v-for="item in included" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="series-catalogue">
        <h3 class="section-title">Séries disponibles</h3>

        <div class="series-grid">
          <article
            v-for="pack in packs"
            :key="pack.id"
            class="series-card"
            :class="{ 'series-card--soon': !pack.available }"
          >
            <div class="series-card__media">
              <img v-if="pack.image" :src="pack.image" :alt="pack.title">
              <span v-else class="series-card__placeholder">Visuel à venir</span>
            </div>

            <div class="series-card__content">
              <span class="series-card__artist">{{ pack.artist }}</span>
              <h4 class="series-card__title">{{ pack.title }}</h4>
              <p class="series-card__desc">{{ pack.description }}</p>
              <span v-if="pack.count" class="series-card__meta">{{ pack.count }} photographies</span>

              <NuxtLink v-if="pack.available" to="/contact" class="series-card__cta">Demander un devis →</NuxtLink>
              <span v-else class="series-card__soon">Bientôt disponible</span>
            </div>
          </article>
        </div>
      </div>

      <div class="louer-practical">
        <h3 class="section-title">Infos pratiques</h3>
        <dl class="practical-infos">
          <div v-for="info in practicalInfos" :key="info.label">
            <dt>{{ info.label }}</dt>
            <dd>{{ info.value }}</dd>
          </div>
        </dl>
        <NuxtLink to="/contact" class="louer-cta">Nous contacter →</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const expositions = [
  {
    id: 1,
    title: 'Titre à définir',
    dates: 'Dates à venir',
    location: 'Lieu à préciser',
    description: 'Description à venir dès que l\'exposition sera confirmée.',
    image: '/la-cour-1.jpg',
  },
  {
    id: 2,
    title: 'Titre à définir',
    dates: 'Dates à venir',
    location: 'Lieu à préciser',
    description: 'Description à venir dès que l\'exposition sera confirmée.',
    image: '/acceuil.jpg',
  },
]

const included = [
  'Tirages photographiques, format adapté à votre espace',
  'Transport et livraison',
  'Installation et désinstallation sur place',
  'Cartels et légendes',
  'Supports de communication (affiche, visuels réseaux sociaux)',
  'Assurance des œuvres pendant la durée de la location',
]

const packs = [
  {
    id: 'memento-mori',
    artist: 'Rémy Gabalda',
    title: 'Memento Mori',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    count: 21,
    image: '/remyGabalda/mementoMori/crane_1.jpg',
    available: true,
  },
  {
    id: 'intifada-al-aqsa',
    artist: 'Rémy Gabalda',
    title: 'Intifada Al Aqsa',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    count: 28,
    image: '/remyGabalda/intifadaAlAqsa/intifada_1.jpg',
    available: true,
  },
  {
    id: 'theo-renaut',
    artist: 'Théo Renaut',
    title: 'Série à venir',
    description: 'Cette série est en cours de préparation et sera bientôt disponible à la location.',
    count: null,
    image: '',
    available: false,
  },
]

const practicalInfos = [
  { label: 'Durée de location', value: 'À définir avec vous (généralement 2 à 8 semaines)' },
  { label: 'Zone de livraison', value: 'À préciser' },
  { label: 'Tarif', value: 'Sur demande, selon format et durée' },
  { label: 'Délai de réservation', value: 'Quelques semaines à l\'avance recommandées' },
]
</script>

<style scoped>
/* ── Hero ────────────────────────────────────────────────── */
.page-hero {
  text-align: center;
  padding: 6rem 2rem 4rem;
  max-width: 700px;
  margin: 0 auto;
}

.page-label {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.page-hero h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.page-intro {
  font-size: 0.95rem;
  line-height: 1.85;
  color: var(--color-text-muted);
}

/* ── Liste des expositions ───────────────────────────────── */
.expositions-list {
  max-width: 1100px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
}

.exposition-row {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3.5rem;
  align-items: center;
  padding: 3.5rem 0;
  border-top: 1px solid var(--color-border);
}

.exposition-row:last-child {
  border-bottom: 1px solid var(--color-border);
}

.exposition-row__media img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.exposition-dates {
  display: block;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.8rem;
}

.exposition-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 300;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.exposition-location {
  display: block;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 1.2rem;
}

.exposition-desc {
  font-size: 0.92rem;
  line-height: 1.85;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  max-width: 560px;
}

.exposition-cta {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  transition: opacity 0.2s;
}

.exposition-cta:hover {
  opacity: 0.5;
}

/* ── Note de bas de page + lien vers la location ─────────── */
.expositions-note {
  text-align: center;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-text-muted);
  max-width: 480px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
  line-height: 1.9;
}

.expositions-jump {
  display: inline-block;
  margin-top: 0.5rem;
  font-style: normal;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  transition: opacity 0.2s;
}

.expositions-jump:hover {
  opacity: 0.5;
}

.expositions-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  max-width: 1100px;
  margin: 0 auto;
}

/* ── Sous-page : Louer une exposition ────────────────────── */
.louer-section {
  padding-top: 5rem;
}

.louer-section__intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
}

.louer-section__intro h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 300;
  letter-spacing: 0.05em;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 2.5rem;
}

/* ── Ce qui est inclus ───────────────────────────────────── */
.louer-included {
  max-width: 700px;
  margin: 0 auto 5rem;
  padding: 0 2rem;
}

.included-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.included-list li {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  padding-left: 1.4rem;
  position: relative;
}

.included-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-text);
}

/* ── Catalogue de séries ─────────────────────────────────── */
.series-catalogue {
  max-width: 1100px;
  margin: 0 auto 5rem;
  padding: 0 2rem;
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
}

.series-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
}

.series-card--soon {
  opacity: 0.6;
}

.series-card__media {
  aspect-ratio: 4 / 3;
  background-color: #f4f4f4;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.series-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.series-card__placeholder {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #bbb;
}

.series-card__content {
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.series-card__artist {
  display: block;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.series-card__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 0.8rem;
}

.series-card__desc {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  flex: 1;
}

.series-card__meta {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 1.2rem;
}

.series-card__cta {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  align-self: flex-start;
  transition: opacity 0.2s;
}

.series-card__cta:hover {
  opacity: 0.5;
}

.series-card__soon {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* ── Infos pratiques ─────────────────────────────────────── */
.louer-practical {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
  text-align: center;
}

.practical-infos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
  margin: 0 0 2.5rem;
  text-align: left;
}

.practical-infos dt {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.3rem;
}

.practical-infos dd {
  font-size: 0.9rem;
  color: var(--color-text);
  margin: 0;
}

.louer-cta {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  transition: opacity 0.2s;
}

.louer-cta:hover {
  opacity: 0.5;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .exposition-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .exposition-row__media img {
    height: 240px;
  }

  .exposition-desc {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .practical-infos {
    grid-template-columns: 1fr;
  }
}
</style>
