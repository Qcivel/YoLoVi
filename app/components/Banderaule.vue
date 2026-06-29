<template>
  <div class="hero">
    <img src="/acceuil.jpg" alt="YoLoVi — Collectif d'artistes" class="hero__img">
    <div class="hero__overlay" aria-hidden="true"></div>
    <div class="hero__caption">
      <span class="hero__label">Collectif d'artistes</span>
      <p class="hero__tagline">YO LO VI</p>
    </div>
  </div>
</template>

<script setup>
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
  z-index: 1;
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

@media (max-width: 600px) {
  .hero {
    height: 60vh;
  }
}
</style>
