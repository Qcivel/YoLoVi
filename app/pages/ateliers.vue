<template>
  <div class="ateliers-page">
    <header class="page-hero">
      <span class="page-label">Le collectif</span>
      <h1>Ateliers</h1>
      <p class="page-intro">Trois formats pour découvrir, approfondir ou transmettre la photographie — encadrés par le collectif, en petits groupes, toujours sur le terrain.</p>
    </header>

    <section
      v-for="(atelier, index) in ateliers"
      :key="atelier.slug"
      :id="atelier.slug"
      class="atelier-block"
      :class="{ 'atelier-block--reverse': index % 2 === 1 }"
    >
      <div class="atelier-block__media">
        <img :src="atelier.image" :alt="atelier.name">
      </div>

      <div class="atelier-block__content">
        <span class="atelier-label">{{ atelier.tagline }}</span>
        <h2>{{ atelier.name }}</h2>
        <p class="atelier-concept">{{ atelier.concept }}</p>

        <h3 class="atelier-subtitle">Pour qui ?</h3>
        <p class="atelier-text">{{ atelier.public }}</p>

        <h3 class="atelier-subtitle">Le déroulé</h3>
        <ul class="atelier-programme">
          <li v-for="step in atelier.programme" :key="step.label">
            <strong>{{ step.label }}</strong> — {{ step.text }}
          </li>
        </ul>

        <dl class="atelier-infos">
          <div v-for="info in atelier.infos" :key="info.label">
            <dt>{{ info.label }}</dt>
            <dd>{{ info.value }}</dd>
          </div>
        </dl>

        <NuxtLink to="/contact" class="atelier-cta">Réserver ma place →</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const ateliers = [
  {
    slug: 'initiation-weekend',
    tagline: 'Atelier — Week-end',
    name: 'Initiation Week-end',
    image: '/la-cour-1.jpg',
    concept: 'Un week-end pour apprendre à sortir du mode automatique et comprendre son appareil, pensé pour les débutants complets.',
    public: 'Grand public, aucun prérequis. Un appareil reflex ou hybride personnel est recommandé.',
    programme: [
      { label: 'Samedi', text: 'Les bases : triangle d\'exposition, mode manuel, composition, lecture de la lumière. Premiers exercices sur le terrain l\'après-midi.' },
      { label: 'Dimanche', text: 'Pratique en extérieur (paysage, portrait, rue), retour sur les images en groupe, initiation à la retouche de base.' },
    ],
    infos: [
      { label: 'Durée', value: '2 jours' },
      { label: 'Groupe', value: '6 à 8 personnes' },
      { label: 'Tarif', value: 'Sur demande' },
      { label: 'Prochaines dates', value: 'À venir' },
    ],
  },
  {
    slug: 'reportage-editing',
    tagline: 'Atelier — Week-end',
    name: 'Un week-end en reportage et éditing',
    image: '/acceuil.jpg',
    concept: 'Pour apprendre à raconter une histoire en images, de la prise de vue jusqu\'à la sélection finale.',
    public: 'Photographes ayant déjà une pratique régulière — ce n\'est pas un premier atelier.',
    programme: [
      { label: 'Samedi — Terrain', text: 'Immersion reportage sur un sujet donné, posture du photographe de reportage, éthique de l\'image.' },
      { label: 'Dimanche — Editing', text: 'Méthode de sélection (écrémage, cohérence, séquençage), construction d\'une petite série narrative, retour critique collectif.' },
    ],
    infos: [
      { label: 'Durée', value: '2 jours' },
      { label: 'Groupe', value: 'Petit comité' },
      { label: 'Tarif', value: 'Sur demande' },
      { label: 'Prochaines dates', value: 'À venir' },
    ],
  },
  {
    slug: 'photo-enfants',
    tagline: 'Atelier — Enfants',
    name: 'La photographie pour les plus petits',
    image: '/banderaule.png',
    concept: 'Une initiation ludique à l\'image, pensée pour éveiller le regard plutôt que d\'enseigner la technique.',
    public: 'Enfants, en petits groupes, encadrement bienveillant adapté à l\'âge.',
    programme: [
      { label: 'Séances thématiques', text: 'Des défis simples et concrets plutôt qu\'un programme théorique — les couleurs de mon quartier, portrait de mon animal, chasse au trésor photo.' },
      { label: 'Restitution', text: 'Les photos des enfants sont réunies en mini-exposition ou diaporama en fin d\'atelier.' },
    ],
    infos: [
      { label: 'Durée', value: 'Séances courtes' },
      { label: 'Groupe', value: 'Petits effectifs' },
      { label: 'Tarif', value: 'Sur demande' },
      { label: 'Prochaines dates', value: 'À venir' },
    ],
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

/* ── Bloc atelier ────────────────────────────────────────── */
.atelier-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2.5rem;
  border-top: 1px solid var(--color-border);
}

.atelier-block--reverse {
  direction: rtl;
}

.atelier-block--reverse > * {
  direction: ltr;
}

.atelier-block__media img {
  width: 100%;
  height: 460px;
  object-fit: cover;
}

.atelier-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.atelier-block h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 300;
  letter-spacing: 0.02em;
  color: var(--color-text);
  margin-bottom: 1.2rem;
}

.atelier-concept {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.atelier-subtitle {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-bottom: 0.6rem;
  margin-top: 1.8rem;
}

.atelier-text {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--color-text-muted);
}

.atelier-programme {
  list-style: none;
  padding: 0;
  margin: 0;
}

.atelier-programme li {
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 0.6rem;
}

.atelier-programme li strong {
  color: var(--color-text);
  font-weight: 500;
}

/* ── Infos pratiques ─────────────────────────────────────── */
.atelier-infos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem 2rem;
  margin: 2rem 0 2.2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.atelier-infos dt {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.3rem;
}

.atelier-infos dd {
  font-size: 0.9rem;
  color: var(--color-text);
  margin: 0;
}

.atelier-cta {
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

.atelier-cta:hover {
  opacity: 0.5;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 900px) {
  .atelier-block,
  .atelier-block--reverse {
    grid-template-columns: 1fr;
    gap: 2rem;
    direction: ltr;
  }

  .atelier-block__media img {
    height: 320px;
  }

  .atelier-infos {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 500px) {
  .atelier-infos {
    grid-template-columns: 1fr;
  }
}
</style>
