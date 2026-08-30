<template>
  <div class="artist-page">
    <header class="artist-hero">
      <span class="artist-discipline">Photographie</span>
      <h1>Julie Garrido</h1>
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

function earthquake() {
  const slides = []
  for (let i = 1; i <= 23 ; i++) {
    
    slides.push({
      src: encodeURI(`/julieGarrido/Earthquake/Earthquake_${i}.jpg`),
      alt: `Intifada Al Aqsa — photo ${i}`,
    })
  }
  return slides
}

const series = [
  {
    slug: 'earthquake',
    name: 'Earthquake',
    slides: earthquake(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
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
