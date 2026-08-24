<template>
  <Teleport to="body">
    <div
      ref="rootEl"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="`Photo ${index + 1} sur ${slides.length}`"
      tabindex="-1"
      @click.self="close"
    >
      <button type="button" class="lightbox__close" aria-label="Fermer le plein écran" @click="close">✕</button>

      <p class="lightbox__counter">{{ index + 1 }} / {{ slides.length }}</p>

      <button
        v-if="slides.length > 1"
        type="button"
        class="lightbox__nav lightbox__nav--prev"
        aria-label="Image précédente"
        @click="go(-1)"
      >←</button>

      <img :src="slides[index].src" :alt="slides[index].alt" class="lightbox__img">

      <button
        v-if="slides.length > 1"
        type="button"
        class="lightbox__nav lightbox__nav--next"
        aria-label="Image suivante"
        @click="go(1)"
      >→</button>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true },
  index: { type: Number, required: true },
})

const emit = defineEmits(['close', 'update:index'])

const rootEl = ref(null)

function go(n) {
  const total = props.slides.length
  emit('update:index', (props.index + n + total) % total)
}

function close() {
  emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') go(-1)
  else if (e.key === 'ArrowRight') go(1)
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
  rootEl.value?.focus()
  // Bascule en plein écran natif du navigateur si disponible — dégrade
  // silencieusement vers l'overlay (déjà plein viewport) sinon.
  if (rootEl.value?.requestFullscreen) {
    rootEl.value.requestFullscreen().catch(() => {})
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {})
  }
})
</script>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.97);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox__img {
  max-width: 92vw;
  max-height: 88vh;
  object-fit: contain;
  display: block;
}

.lightbox__close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.lightbox__close:hover,
.lightbox__close:focus-visible {
  opacity: 1;
}

.lightbox__counter {
  position: absolute;
  top: 1.75rem;
  left: 2rem;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  padding: 1rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.lightbox__nav:hover,
.lightbox__nav:focus-visible {
  opacity: 1;
}

.lightbox__nav--prev {
  left: 0.5rem;
}

.lightbox__nav--next {
  right: 0.5rem;
}

@media (max-width: 600px) {
  .lightbox__close {
    top: 1rem;
    right: 1rem;
  }

  .lightbox__counter {
    top: 1.1rem;
    left: 1.25rem;
  }

  .lightbox__nav {
    font-size: 1.4rem;
    padding: 0.6rem;
  }
}
</style>
