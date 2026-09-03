<template>
  <div class="cms-shell">
    <HeaderCoulisses :user-name="userName" @logout="handleLogout" />
    <div class="cms-body">
      <SidebarCoulisses :unread-messages="unreadMessages" @logout="handleLogout" />
      <main class="cms-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// TODO: remplacer par les vraies donnees issues de /api/auth/me
const userName = ref('Admin')
const unreadMessages = ref(7)

function handleLogout() {
  // TODO: appeler POST /api/auth/logout puis rediriger vers /coulisses/connexion
}
</script>

<style scoped>
.cms-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
}

.cms-body {
  flex: 1;
  display: flex;
}

.cms-main {
  flex: 1;
  min-width: 0;
  padding: 2rem 2.5rem;
}
</style>
