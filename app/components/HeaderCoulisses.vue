<template>
  <header class="cms-header">
    <div class="cms-header__left">
      <NuxtLink to="/coulisses" class="cms-logo">YO LO VI</NuxtLink>
      <span class="cms-divider" aria-hidden="true"></span>
      <span class="cms-section-label">Administration</span>
    </div>

    <div class="cms-header__right">
      <span class="cms-user">{{ userName }}</span>
      <span class="cms-dot" aria-hidden="true">·</span>
      <button type="button" class="cms-logout" @click="$emit('logout')">
        Déconnexion
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    default: 'Admin'
  }
})

defineEmits(['logout'])
</script>

<style scoped>
.cms-header {
  height: 56px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #121212;
  color: #fff;
}

.cms-header__left,
.cms-header__right {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.cms-logo {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #fff;
}

.cms-divider {
  width: 1px;
  height: 14px;
  background-color: rgba(255, 255, 255, 0.25);
}

.cms-section-label,
.cms-user {
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.65);
}

.cms-dot {
  color: rgba(255, 255, 255, 0.35);
}

.cms-logout {
  all: unset;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.65);
  transition: color 0.2s;
}

.cms-logout:hover,
.cms-logout:focus-visible {
  color: #fff;
}

.cms-logout:focus-visible {
  outline: 1px solid #fff;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .cms-header {
    padding: 0 1.25rem;
  }

  .cms-section-label {
    display: none;
  }

  .cms-divider {
    display: none;
  }
}
</style>
