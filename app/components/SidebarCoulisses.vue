<template>
  <nav class="cms-sidebar" aria-label="Navigation du CMS">
    <ul class="cms-nav">
      <li>
        <NuxtLink to="/coulisses" class="cms-nav__link" exact-active-class="cms-nav__link--active">
          Tableau de bord
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/coulisses/artistes" class="cms-nav__link" active-class="cms-nav__link--active">
          Artistes
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/coulisses/contenu" class="cms-nav__link" active-class="cms-nav__link--active">
          Gestion du contenu
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/coulisses/messages" class="cms-nav__link cms-nav__link--with-badge" active-class="cms-nav__link--active">
          <span>Messages</span>
          <span v-if="unreadMessages > 0" class="cms-badge">{{ unreadMessages }}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/coulisses/parametres" class="cms-nav__link" active-class="cms-nav__link--active">
          Paramètres
        </NuxtLink>
      </li>
    </ul>

    <button type="button" class="cms-nav__logout" @click="$emit('logout')">
      Déconnexion
    </button>
  </nav>
</template>

<script setup>
defineProps({
  unreadMessages: {
    type: Number,
    default: 0
  }
})

defineEmits(['logout'])
</script>

<style scoped>
.cms-sidebar {
  width: 220px;
  flex-shrink: 0;
  padding: 1.75rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-right: 1px solid var(--color-border, #e8e8e8);
}

.cms-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.cms-nav__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1.75rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 400;
  color: var(--color-text-muted, #6b6560);
  border-left: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.cms-nav__link:hover,
.cms-nav__link:focus-visible {
  color: var(--color-text, #0d0d0d);
}

.cms-nav__link--active {
  color: var(--color-text, #0d0d0d);
  font-weight: 500;
  border-left-color: var(--color-text, #0d0d0d);
}

.cms-badge {
  min-width: 1.1rem;
  height: 1.1rem;
  padding: 0 0.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 500;
  color: #fff;
  background-color: #121212;
  border-radius: 999px;
}

.cms-nav__logout {
  all: unset;
  cursor: pointer;
  margin: 1.5rem 1.75rem 0;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 400;
  color: #b3261e;
  transition: opacity 0.2s;
}

.cms-nav__logout:hover,
.cms-nav__logout:focus-visible {
  opacity: 0.7;
}

.cms-nav__logout:focus-visible {
  outline: 1px solid #b3261e;
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .cms-sidebar {
    width: 180px;
  }

  .cms-nav__link {
    padding: 0.6rem 1.25rem;
  }
}
</style>
