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

    <p class="expositions-note">D'autres dates seront annoncées prochainement — suivez le collectif pour ne rien manquer.</p>
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

/* ── Note de bas de page ─────────────────────────────────── */
.expositions-note {
  text-align: center;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--color-text-muted);
  max-width: 480px;
  margin: 0 auto 6rem;
  padding: 0 2rem;
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
</style>
