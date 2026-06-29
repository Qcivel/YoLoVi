<template>
  <section
    id="artists"
    class="artists-section"
    :class="{ 'artists-section--home': isHome }"
    aria-label="Les artistes"
  >
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
  </section>
</template>

<script setup>
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<style scoped>
/* ── Section wrapper ─────────────────────────────────────── */
.artists-section {
  position: relative;
  z-index: 20;
  width: 100%;
  height: var(--artists-h, 9.5rem);
  display: flex;
  align-items: center;
  justify-content: center;

  /* Par défaut (pages internes) : fond blanc, séparé du header */
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  margin-top: var(--header-h, 70px);
}

/* Sur la home : transparent, les cartes flottent sur l'image hero,
   départ juste sous le header pour ne pas se superposer */
.artists-section--home {
  background: transparent;
  border-bottom: none;
  margin-top: var(--header-h, 70px);
}

/* ── Grille des 4 artistes ───────────────────────────────── */
.artists-grid {
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
}

/* ── Carte artiste ───────────────────────────────────────── */
.artist-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

/* ── Portrait circulaire ─────────────────────────────────── */
.artist-portrait {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #e0e0e0;
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.artist-card:hover .artist-portrait {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.22);
}

/* ── Nom ─────────────────────────────────────────────────── */
.artist-name {
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0;
  color: #111;
  transition: color 0.2s;
}

/* Sur le hero, les noms passent en blanc pour lisibilité */
.artists-section--home .artist-name {
  color: #fff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

/* Page active */
.artist-card.router-link-active .artist-portrait {
  border-color: #111;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 600px) {
  .artists-grid {
    gap: 1.25rem;
  }

  .artist-portrait {
    width: 52px;
    height: 52px;
  }

  .artist-name {
    font-size: 0.55rem;
  }
}
</style>
