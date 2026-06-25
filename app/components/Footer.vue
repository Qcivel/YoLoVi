<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-copy">&copy; 2026 YO LO VI — Tous droits réservés.</p>
      <nav class="footer-nav" aria-label="Liens légaux">
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer {
  border-top: 1px solid #e8e8e8;
  padding: 2rem;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copy {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: #aaa;
}

.footer-nav {
  display: flex;
  gap: 2rem;
}

.footer-nav a {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #aaa;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-nav a:hover,
.footer-nav a.router-link-active {
  color: #111;
}

@media (max-width: 480px) {
  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
