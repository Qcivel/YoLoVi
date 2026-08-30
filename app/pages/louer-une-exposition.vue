<template>
  <div class="louer-page">
    <header class="page-hero">
      <span class="page-label">Le collectif</span>
      <h1>Louer une exposition</h1>
      <p class="page-intro">Mairies, médiathèques, entreprises, galeries — le collectif propose ses séries photographiques en location clé en main, prêtes à être accrochées.</p>
    </header>

    <section class="louer-included">
      <h2 class="section-title">Ce qui est inclus</h2>
      <ul class="included-list">
        <li v-for="item in included" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="series-catalogue">
      <h2 class="section-title">Séries disponibles</h2>

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
            <h3 class="series-card__title">{{ pack.title }}</h3>
            <p class="series-card__desc">{{ pack.description }}</p>
            <span v-if="pack.count" class="series-card__meta">{{ pack.count }} photographies</span>

            <NuxtLink v-if="pack.available" to="/contact" class="series-card__cta">Demander un devis →</NuxtLink>
            <span v-else class="series-card__soon">Bientôt disponible</span>
          </div>
        </article>
      </div>
    </section>

    <section class="louer-practical">
      <h2 class="section-title">Infos pratiques</h2>
      <dl class="practical-infos">
        <div v-for="info in practicalInfos" :key="info.label">
          <dt>{{ info.label }}</dt>
          <dd>{{ info.value }}</dd>
        </div>
      </dl>
      <NuxtLink to="/contact" class="louer-cta">Nous contacter →</NuxtLink>
    </section>
  </div>
</template>

<script setup>
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

/* ── Sections communes ───────────────────────────────────── */
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
@media (max-width: 600px) {
  .practical-infos {
    grid-template-columns: 1fr;
  }
}
</style>
