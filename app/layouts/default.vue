<template>
  <div class="layout" :class="{ 'layout--home': isHome }">
    <Header />
    <Artists />
    <main class="layout__main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<style scoped>
</style>
