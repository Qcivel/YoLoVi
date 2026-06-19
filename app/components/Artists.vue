<template>
  <section id="artists" class="artists-section" aria-label="Les artistes">
    <div class="container">
      <div class="artists-grid">
        <NuxtLink to="/MolyRoute" class="artist-card">
          <div class="artist-portrait" style="background-image: url('/chemin/vers/photo1.jpg');"></div>
          <h3 class="artist-name">Moly Route</h3>
        </NuxtLink>

        <NuxtLink to="/ClaireVonCorda" class="artist-card">
          <div class="artist-portrait" style="background-image: url('/PORTRAIT-WOESTELANDT-Emilie.png');"></div>
          <h3 class="artist-name">Claire Von Corda</h3>
        </NuxtLink>

        <NuxtLink to="/TheoRenaut" class="artist-card">
          <div class="artist-portrait" style="background-image: url('/chemin/vers/photo3.jpg');"></div>
          <h3 class="artist-name">Théo Renaut</h3>
        </NuxtLink>

        <NuxtLink to="/RemyGabalda" class="artist-card">
          <div class="artist-portrait" style="background-image: url('/chemin/vers/photo4.jpg');"></div>
          <h3 class="artist-name">Rémy Gabalda</h3>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
</style>
