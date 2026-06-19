<template>
  <div class="artist-page">
    <header class="artist-hero">
      <span class="artist-discipline">Photographie</span>
      <h1>Claire Von Corda</h1>
    </header>

    <section class="artist-intro">
      <p class="artist-statement">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </section>

    <div class="slideshow-container">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="mySlides fade"
        :style="{ display: index === current ? 'block' : 'none' }"
      >
        <p class="slide-counter">{{ index + 1 }} / {{ slides.length }}</p>
        <img :src="slide.src" :alt="slide.caption" class="slide-img">
        <p class="slide-caption">{{ slide.caption }}</p>
      </div>

      <button class="prev" @click="changeSlide(-1)" aria-label="Image précédente">←</button>
      <button class="next" @click="changeSlide(1)" aria-label="Image suivante">→</button>
    </div>

    <div class="dots">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        class="dot"
        :class="{ active: index === current }"
        @click="current = index"
        :aria-label="`Image ${index + 1}`"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const slides = [
  { src: '/AFFICHE-TOULOUSE-CAMELEON-2026-03-26.png', caption: 'Affiche Toulouse Caméléon, 2026' },
  { src: '/PORTRAIT-WOESTELANDT-Emilie.png', caption: 'Portrait, série En suspens' },
]

const current = ref(0)

function changeSlide(n) {
  current.value = (current.value + n + slides.length) % slides.length
}
</script>

<style scoped>
</style>
