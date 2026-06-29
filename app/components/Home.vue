<template>
  <div>
    <Banderaule />

    <section id="about" class="projet">
      <h2>Le projet</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </section>

    <section class="artists-details">
      <article class="artist-article">
        <div class="artist-profile">
          <h2>Claire Von Corda</h2>
          <img src="/PORTRAIT-WOESTELANDT-Emilie.png" alt="Portrait de Claire Von Corda">
        </div>
        <div class="artist-bio">
          <h3>Sa démarche artistique</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <NuxtLink to="/ClaireVonCorda">Voir plus</NuxtLink>
        </div>
      </article>

      <article class="artist-article">
        <div class="artist-profile">
          <h2>Moly Route</h2>
          <img src="/PORTRAIT-WOESTELANDT-Emilie.png" alt="Portrait de Moly Route">
        </div>
        <div class="artist-bio">
          <h3>Sa démarche artistique</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <NuxtLink to="/MolyRoute">Voir plus</NuxtLink>
        </div>
      </article>

      <article class="artist-article">
        <div class="artist-profile">
          <h2>Théo Renaut</h2>
          <img src="/PORTRAIT-WOESTELANDT-Emilie.png" alt="Portrait de Théo Renaut">
        </div>
        <div class="artist-bio">
          <h3>Sa démarche artistique</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <NuxtLink to="/TheoRenaut">Voir plus</NuxtLink>
        </div>
      </article>

      <article class="artist-article">
        <div class="artist-profile">
          <h2>Rémy Gabalda</h2>
          <img src="/PORTRAIT-WOESTELANDT-Emilie.png" alt="Portrait de Rémy Gabalda">
        </div>
        <div class="artist-bio">
          <h3>Sa démarche artistique</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <NuxtLink to="/RemyGabalda">Voir plus</NuxtLink>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
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
</style>
