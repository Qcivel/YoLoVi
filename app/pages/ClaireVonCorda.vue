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

    <section class="projects-section">
      <h2 class="section-title">Projets</h2>

      <article class="project">
        <div class="project-text">
          <h3 class="project-title">En Suspens</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        </div>
        <div class="project-video">
          <div class="video-placeholder" aria-label="Vidéo du projet En Suspens">
            <span class="video-icon">▶</span>
            <p>Vidéo à venir</p>
          </div>
        </div>
      </article>

      <article class="project project--reverse">
        <div class="project-text">
          <h3 class="project-title">Fragments</h3>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur.</p>
          <p>Adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
        </div>
        <div class="project-video">
          <div class="video-placeholder" aria-label="Vidéo du projet Fragments">
            <span class="video-icon">▶</span>
            <p>Vidéo à venir</p>
          </div>
        </div>
      </article>
    </section>

    <section class="videos-section">
      <h2 class="section-title">Vidéos</h2>
      <div class="videos-grid">
        <div class="video-embed-wrapper" v-for="(video, i) in videos" :key="i">
          <iframe
            v-if="video.src"
            :src="video.src"
            :title="video.title"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div v-else class="video-placeholder" :aria-label="video.title">
            <span class="video-icon">▶</span>
            <p>{{ video.title }}</p>
          </div>
        </div>
      </div>
    </section>
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

const videos = [
  { src: '', title: 'En Suspens — Making of' },
  { src: '', title: 'Fragments — Teaser' },
  { src: '', title: 'Atelier — Process' },
]
</script>

<style scoped>
/* ── Projects Section ────────────────────────────────────── */
.projects-section,
.videos-section {
  max-width: 1100px;
  margin: 5rem auto;
  padding: 0 2rem;
}

.section-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
  color: #111;
}

.project {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 5rem;
}

.project--reverse {
  direction: rtl;
}

.project--reverse > * {
  direction: ltr;
}

.project-title {
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  color: #111;
}

.project-text p {
  font-size: 0.95rem;
  line-height: 1.85;
  color: #444;
  margin-bottom: 1rem;
}

/* ── Video placeholders ──────────────────────────────────── */
.video-placeholder {
  aspect-ratio: 16 / 9;
  background-color: #f4f4f4;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #999;
  cursor: default;
  transition: background-color 0.2s;
}

.video-placeholder:hover {
  background-color: #ebebeb;
}

.video-icon {
  font-size: 2rem;
  opacity: 0.4;
}

.video-placeholder p {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ── Videos Grid ─────────────────────────────────────────── */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.video-embed-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.video-embed-wrapper iframe {
  width: 100%;
  height: 100%;
  display: block;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .project,
  .project--reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }

  .videos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
