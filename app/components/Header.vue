<template>
  <header class="site-header" :class="{ 'site-header--scrolled': scrolled, 'site-header--home': isHome }">
    <div class="container">
      <h1 class="logo"><NuxtLink to="/">YO LO VI</NuxtLink></h1>
      <nav class="main-nav" aria-label="Navigation principale">
        <ul>
          <li><NuxtLink to="/">Le Projet</NuxtLink></li>
          <li><NuxtLink to="/artistes">Les Artistes</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-h, 70px);
  display: flex;
  align-items: center;
  transition: background 0.35s ease, box-shadow 0.35s ease;
}

/* Par défaut (toutes pages) : fond blanc visible */
.site-header {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 0 #e8e8e8;
}

/* Home uniquement : transparent sur le hero tant qu'on n'a pas scrollé */
.site-header--home:not(.site-header--scrolled) {
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin: 0;
}

.logo a {
  text-decoration: none;
  color: #111;
  transition: color 0.2s;
}

/* Texte blanc uniquement sur la home avant scroll */
.site-header--home:not(.site-header--scrolled) .logo a {
  color: #fff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

/* Nav */
.main-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 2.5rem;
}

.main-nav a {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: #111;
  transition: color 0.2s;
}

.site-header--home:not(.site-header--scrolled) .main-nav a {
  color: #fff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.main-nav a:hover,
.main-nav a.router-link-active {
  opacity: 0.6;
}

@media (max-width: 600px) {
  .main-nav ul {
    gap: 1.5rem;
  }
}
</style>
