<template>
  <div class="artist-page">
    <header class="artist-hero">
      <span class="artist-discipline">Photographie</span>
      <h1>Théo Renaut</h1>
    </header>

    <section class="artist-intro">
      <p class="artist-statement">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </section>

    <nav class="series-tabs" aria-label="Séries photographiques">
      <button
        v-for="(s, index) in series"
        :key="s.slug"
        type="button"
        class="series-tab"
        :class="{ 'series-tab--active': index === activeSeries }"
        :aria-pressed="index === activeSeries"
        @click="selectSeries(index)"
      >
        {{ s.name }}
      </button>
    </nav>

    <div class="slideshow-container">
      <div
        v-for="(slide, index) in activeSlides"
        :key="slide.src"
        class="mySlides fade"
        :style="{ display: index === current ? 'block' : 'none' }"
      >
        <p class="slide-counter">{{ index + 1 }} / {{ activeSlides.length }}</p>
        <button type="button" class="slide-expand" aria-label="Voir en plein écran" @click="lightboxOpen = true">
          <img :src="slide.src" :alt="slide.alt" class="slide-img">
          <span class="slide-expand__icon" aria-hidden="true">⛶</span>
        </button>
      </div>

      <button class="prev" @click="changeSlide(-1)" aria-label="Image précédente">←</button>
      <button class="next" @click="changeSlide(1)" aria-label="Image suivante">→</button>
    </div>

    <div class="dots">
      <span
        v-for="(slide, index) in activeSlides"
        :key="slide.src"
        class="dot"
        :class="{ active: index === current }"
        @click="current = index"
        :aria-label="`Image ${index + 1}`"
      ></span>
    </div>

    <section class="series-description">
      <p>{{ activeDescription }}</p>
    </section>

    <PhotoLightbox
      v-if="lightboxOpen"
      :slides="activeSlides"
      :index="current"
      @update:index="current = $event"
      @close="lightboxOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

function laCourSlides() {
  const slides = []
  for (let i = 1; i <= 17; i++) {
    slides.push({
      src: `/theoRenaut/LaCour/la-cour-${i}.jpg`,
      alt: `La Cour — photo ${i}`,
    })
  }
  return slides
}

function accueilSlides() {
  const files = [
    'IMG-20250728-WA0000.jpg',
    'IMG-20250728-WA0001.jpg',
    'IMG-20250728-WA0002.jpg',
    'IMG-20250728-WA0004.jpg',
    'IMG-20250728-WA0005.jpg',
    'IMG-20250728-WA0006.jpg',
    'IMG-20250728-WA0007.jpg',
    'IMG-20250728-WA0008.jpg',
    'IMG-20250728-WA0009.jpg',
    'IMG-20250728-WA0010.jpg',
    'IMG-20250728-WA0011.jpg',
    'IMG-20250728-WA0013.jpg',
    'IMG-20250728-WA0014.jpg',
    'IMG-20250728-WA0015.jpg',
    'IMG-20250728-WA0016.jpg',
    'IMG-20250728-WA0017.jpg',
    'IMG-20250728-WA0018.jpg',
    'IMG-20250728-WA0019.jpg',
    'IMG-20250728-WA0020.jpg',
    'IMG-20250728-WA0021.jpg',
    'IMG-20250728-WA0022.jpg',
  ]
  return files.map((file, i) => ({
    src: `/theoRenaut/acceuil/${file}`,
    alt: `Accueil — photo ${i + 1}`,
  }))
}

function archiveSlides() {
  const files = [
    'g.jpg',
    'g-2.jpg',
    'g-3.jpg',
    `page d'accueuil 2.jpg`,
  ]
  return files.map((file, i) => ({
    src: encodeURI(`/theoRenaut/archive/${file}`),
    alt: `Archives — photo ${i + 1}`,
  }))
}

const series = [
  {
    slug: 'la-cour',
    name: 'La Cour',
    slides: laCourSlides(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    slug: 'accueil',
    name: 'Accueil',
    slides: accueilSlides(),
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
  },
  {
    slug: 'archives',
    name: 'Archives',
    slides: archiveSlides(),
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.',
  },
]

const activeSeries = ref(0)
const current = ref(0)
const lightboxOpen = ref(false)

const activeSlides = computed(() => series[activeSeries.value].slides)
const activeDescription = computed(() => series[activeSeries.value].description)

function selectSeries(index) {
  if (index === activeSeries.value) return
  activeSeries.value = index
  current.value = 0
  lightboxOpen.value = false
}

function changeSlide(n) {
  const total = activeSlides.value.length
  current.value = (current.value + n + total) % total
}
</script>

<style scoped>
.series-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin: 0 auto 2.5rem;
  padding: 0 2rem;
}

.series-tab {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: #999;
  font-weight: 400;
  transition: color 0.2s, font-weight 0.2s;
}

.series-tab:hover {
  color: #555;
}

.series-tab--active {
  color: #111;
  font-weight: 700;
}

/* Beaucoup de photos par série : les dots doivent pouvoir passer à la ligne */
.dots {
  flex-wrap: wrap;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.series-description {
  max-width: 620px;
  margin: 2.5rem auto 0;
  padding: 0 2rem;
  text-align: center;
}

.series-description p {
  font-family: var(--font-display, inherit);
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 300;
  line-height: 1.8;
  color: var(--color-text-muted, #999);
}
</style>
