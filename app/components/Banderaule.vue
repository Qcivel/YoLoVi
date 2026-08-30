<template>
  <div class="hero">
    <NuxtLink
      v-for="(slide, index) in slides"
      :key="slide.to"
      :to="slide.to"
      class="hero__slide"
      :class="{ 'hero__slide--active': index === activeIndex }"
      :aria-label="`Découvrir ${slide.name}`"
      :aria-hidden="index === activeIndex ? undefined : 'true'"
      :tabindex="index === activeIndex ? undefined : -1"
    >
      <img :src="slide.image" :alt="slide.alt" class="hero__img">
    </NuxtLink>

    <div class="hero__overlay" aria-hidden="true"></div>

    <div class="hero__caption">
      <span class="hero__label">Collectif d'artistes</span>
      <p class="hero__tagline">YO LO VI</p>
    </div>

    <p class="hero__artist" aria-live="polite">{{ slides[activeIndex].name }}</p>

    <div class="hero__dots" role="tablist" aria-label="Choisir une photo">
      <button
        v-for="(slide, index) in slides"
        :key="slide.to"
        type="button"
        class="hero__dot"
        :class="{ 'hero__dot--active': index === activeIndex }"
        role="tab"
        :aria-selected="index === activeIndex"
        :aria-label="`Voir ${slide.name}`"
        @click="goTo(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// TODO : remplacer `image` par la vraie photo de chaque artiste quand elles seront prêtes
const slides = [
  { name: 'Julie Garrido', to: '/JulieGarrido', image: '/julieGarrido/Earthquake/Earthquake_1.jpg', alt: 'Photo de Julie' },
  { name: 'Théo Renaut', to: '/TheoRenaut', image: '/theoRenaut/LaCour/la-cour_4.jpg', alt: 'Photo de Théo Renaut' },
  { name: 'Rémy Gabalda', to: '/RemyGabalda', image: '/remyGabalda/DSCF4252.JPG', alt: 'Photo de Rémy Gabalda' },
]

const INTERVAL_MS = 5000

const activeIndex = ref(0)
let timer = null

function next() {
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

function goTo(index) {
  activeIndex.value = index
  restart()
}

function start() {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  stop()
  timer = setInterval(next, INTERVAL_MS)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function restart() {
  start()
}

onMounted(start)
onUnmounted(stop)
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  /* 100vh - on remonte de artists-h pour que la section reste 100vh visuellement */
  height: 100vh;
  min-height: 500px;
  overflow: hidden;
  /* Remonte derrière header + artists pour que l'image couvre tout le viewport */
  margin-top: calc(-1 * (var(--header-h, 70px) + var(--artists-h, 9.5rem)));
  z-index: 1;
}

.hero__slide {
  position: absolute;
  inset: 0;
  display: block;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1.2s ease;
}

.hero__slide--active {
  z-index: 2;
  opacity: 1;
  pointer-events: auto;
}

.hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Dégradé bas → transparent en haut, fond blanc en bas
   pour fondre l'image dans la section suivante */
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0)    25%,
    rgba(255, 255, 255, 0)    70%,
    rgba(255, 255, 255, 0.7)  90%,
    rgba(255, 255, 255, 1)    100%
  );
}

.hero__caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 4;
  white-space: nowrap;
}

.hero__label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #e7e7e7;
  margin-bottom: 0.5rem;
}

.hero__tagline {
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 200;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #e7e7e7;
  margin: 0;
}

.hero__artist {
  position: absolute;
  bottom: 4.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  margin: 0;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #e7e7e7;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.hero__dots {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  gap: 0.6rem;
}

.hero__dot {
  width: 7px;
  height: 7px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;
}

.hero__dot:hover {
  transform: scale(1.2);
}

.hero__dot--active {
  background: #fff;
}

@media (max-width: 600px) {
  .hero {
    height: 60vh;
  }

  .hero__artist {
    bottom: 3.5rem;
    font-size: 0.6rem;
  }

  .hero__dots {
    bottom: 1.75rem;
  }
}
</style>
