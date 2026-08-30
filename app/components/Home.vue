<template>
  <div>
    <Banderaule />

    <section id="about" class="projet">
      <h2>Le projet</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </section>

    <section class="artists-showcase" aria-label="Les artistes du collectif">
      <NuxtLink
        v-for="artist in artists"
        :key="artist.to"
        :to="artist.to"
        class="artists-showcase__item"
      >
        <h3 class="artists-showcase__name">{{ artist.name }}</h3>
        <img :src="artist.image" :alt="`Photo de ${artist.name}`" class="artists-showcase__img">
      </NuxtLink>
    </section>

    <section class="whats-new" aria-label="Nouveautés">
      <h2 class="whats-new__title">What's new ?</h2>
      <div class="whats-new__grid">
        <NuxtLink
          v-for="item in whatsNew"
          :key="item.series"
          :to="item.to"
          class="whats-new__item"
        >
          <h3 class="whats-new__label">{{ item.artist }} - {{ item.series }}</h3>
          <img :src="item.image" :alt="`Série ${item.series}, par ${item.artist}`" class="whats-new__img">
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const artists = [
  { name: 'Julie Garrido', to: '/JulieGarrido', image: '/julieGarrido/Earthquake/Earthquake_1.jpg', alt: 'Photo de Julie' },
  { name: 'Théo Renaut', to: '/TheoRenaut', image: '/theoRenaut/LaCour/la-cour_4.jpg', alt: 'Photo de Théo Renaut' },
  { name: 'Rémy Gabalda', to: '/RemyGabalda', image: '/remyGabalda/DSCF4252.JPG', alt: 'Photo de Rémy Gabalda' },
]

// Séries récemment ajoutées par les artistes — à compléter au fur et à mesure
// que Théo et Moly publient les leurs (cf. la logique de séries dans RemyGabalda.vue).
const whatsNew = [
  {
    artist: 'Rémy Gabalda',
    series: 'Memento Mori',
    to: '/RemyGabalda',
    image: encodeURI('/remyGabalda/mementoMori/crane_1.jpg'),
  },
  {
    artist: 'Rémy Gabalda',
    series: 'Intifada Al Aqsa',
    to: '/RemyGabalda',
    image: encodeURI('/remyGabalda/intifadaAlAqsa/intifada_1.jpg'),
  },
]
</script>

<style scoped>
.projet {
  max-width: 720px;
  margin: 0 auto 5rem;
  padding: 0 2rem;
  text-align: center;
}

.projet h2 {
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 1.5rem;
}

.projet p {
  font-size: 0.95rem;
  line-height: 1.9;
  color: #555;
}

.artists-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem 5rem;
}

.artists-showcase__item {
  display: block;
}

.artists-showcase__name {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.75rem;
}

.artists-showcase__img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.artists-showcase__item:hover .artists-showcase__img {
  transform: scale(1.04);
}

.whats-new {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem 6rem;
}

.whats-new__title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 400;
  text-align: center;
  margin-bottom: 2.5rem;
}

.whats-new__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem 1.5rem;
}

.whats-new__item {
  display: block;
}

.whats-new__label {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.75rem;
}

.whats-new__img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.whats-new__item:hover .whats-new__img {
  transform: scale(1.04);
}

@media (max-width: 700px) {
  .artists-showcase {
    grid-template-columns: 1fr;
  }

  .whats-new__grid {
    grid-template-columns: 1fr;
  }
}
</style>
