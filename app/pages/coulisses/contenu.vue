<template>
  <section class="photo-gallery" aria-labelledby="photo-gallery-title">
    <div class="photo-gallery__head">
      <h2 id="photo-gallery-title" class="photo-gallery__title">Galerie photos</h2>
      <label for="photo-upload" class="photo-gallery__add-btn">+ Ajouter des photos</label>
    </div>

    <hr class="photo-gallery__divider">

    <div class="photo-gallery__grid">
      <label class="photo-gallery__drop">
        <input id="photo-upload" type="file" accept="image/*" multiple class="photo-gallery__input">
        <span class="photo-gallery__plus" aria-hidden="true">+</span>
        <span class="photo-gallery__drop-label">Ajouter</span>
      </label>
    </div>
  </section>
</template>

<script setup>
definePageMeta({ layout: 'coulisses' })
</script>

<style scoped>
.photo-gallery {
  max-width: 900px;
}

.photo-gallery__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.photo-gallery__title {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted, #6b6560);
}

.photo-gallery__add-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.1rem;
  background-color: #121212;
  color: #fff;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: opacity 0.2s;
}

.photo-gallery__add-btn:hover {
  opacity: 0.85;
}

.photo-gallery__divider {
  border: none;
  border-top: 1px solid var(--color-border, #e8e8e8);
  margin: 0 0 2rem;
}

.photo-gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
}

.photo-gallery__drop {
  position: relative;
  aspect-ratio: 4 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background-color: #f5f2f0;
  border: 1px dashed #d9d5d0;
  color: var(--color-text-muted, #6b6560);
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.photo-gallery__drop:hover {
  background-color: #efece9;
  border-color: #b8b2ab;
}

.photo-gallery__drop:focus-within {
  outline: 2px solid var(--color-text, #0d0d0d);
  outline-offset: 2px;
}

.photo-gallery__input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.photo-gallery__plus {
  font-size: 1.75rem;
  font-weight: 300;
  line-height: 1;
}

.photo-gallery__drop-label {
  font-size: 0.78rem;
  letter-spacing: 0.04em;
}
</style>
