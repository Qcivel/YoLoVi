<template>
  <div class="artists-page">
    <header class="page-hero">
      <span class="page-label">Collectif</span>
      <h1>Les Artistes</h1>
      <p class="page-intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    </header>

    <section class="artists-list" aria-label="Liste des artistes">
      <article
        v-for="artist in artists"
        :key="artist.slug"
        class="artist-row"
      >
        <NuxtLink :to="artist.route" class="artist-row__portrait-link" :aria-label="`Voir le profil de ${artist.name}`">
          <div
            class="artist-row__portrait"
            :style="artist.photo ? `background-image: url('${artist.photo}')` : ''"
            :aria-hidden="true"
          >
            <span v-if="!artist.photo" class="portrait-initials">{{ initials(artist.name) }}</span>
          </div>
        </NuxtLink>

        <div class="artist-row__content">
          <div class="artist-row__meta">
            <span class="artist-discipline">{{ artist.discipline }}</span>
            <NuxtLink :to="artist.route" class="artist-row__name-link">
              <h2 class="artist-name">{{ artist.name }}</h2>
            </NuxtLink>
          </div>
          <p class="artist-bio">{{ artist.bio }}</p>
          <NuxtLink :to="artist.route" class="artist-row__cta" :aria-label="`Découvrir le travail de ${artist.name}`">
            Découvrir →
          </NuxtLink>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
const artists = [
  {
    slug: 'moly-route',
    name: 'Moly Route',
    discipline: 'Photographie',
    route: '/MolyRoute',
    photo: '',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    slug: 'claire-von-corda',
    name: 'Claire Von Corda',
    discipline: 'Photographie',
    route: '/ClaireVonCorda',
    photo: '/PORTRAIT-WOESTELANDT-Emilie.png',
    bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    slug: 'theo-renaut',
    name: 'Théo Renaut',
    discipline: 'Photographie',
    route: '/TheoRenaut',
    photo: '',
    bio: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
  },
  {
    slug: 'remy-gabalda',
    name: 'Rémy Gabalda',
    discipline: 'Photographie',
    route: '/RemyGabalda',
    photo: '',
    bio: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil.',
  },
]

function initials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<style scoped>
/* ── Hero ────────────────────────────────────────────────── */
.page-hero {
  text-align: center;
  padding: 6rem 2rem 4rem;
  max-width: 700px;
  margin: 0 auto;
}

.page-label {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 1rem;
}

.page-hero h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 1.5rem;
}

.page-intro {
  font-size: 0.95rem;
  line-height: 1.85;
  color: #666;
}

/* ── Artists List ────────────────────────────────────────── */
.artists-list {
  max-width: 1100px;
  margin: 0 auto 6rem;
  padding: 0 2rem;
}

.artist-row {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 4rem;
  align-items: center;
  padding: 4rem 0;
  border-top: 1px solid #e8e8e8;
}

.artist-row:last-child {
  border-bottom: 1px solid #e8e8e8;
}

/* ── Portrait ────────────────────────────────────────────── */
.artist-row__portrait-link {
  display: block;
  text-decoration: none;
}

.artist-row__portrait {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-color: #f0f0f0;
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.artist-row__portrait-link:hover .artist-row__portrait {
  transform: scale(1.03);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.portrait-initials {
  font-size: 2.5rem;
  font-weight: 200;
  letter-spacing: 0.05em;
  color: #bbb;
  pointer-events: none;
}

/* ── Content ─────────────────────────────────────────────── */
.artist-row__meta {
  margin-bottom: 1.2rem;
}

.artist-discipline {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.5rem;
}

.artist-row__name-link {
  text-decoration: none;
}

.artist-name {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 300;
  letter-spacing: 0.05em;
  color: #111;
  margin: 0;
  transition: color 0.2s;
}

.artist-row__name-link:hover .artist-name {
  color: #555;
}

.artist-bio {
  font-size: 0.95rem;
  line-height: 1.85;
  color: #555;
  margin-bottom: 1.8rem;
  max-width: 560px;
}

.artist-row__cta {
  display: inline-block;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #111;
  text-decoration: none;
  border-bottom: 1px solid #111;
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}

.artist-row__cta:hover {
  color: #777;
  border-color: #777;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .artist-row {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .artist-bio {
    max-width: 100%;
    text-align: left;
  }

  .artist-row__portrait {
    width: 160px;
    height: 160px;
  }
}
</style>
