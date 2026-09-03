<template>
    <div>
        <form action="" @submit.prevent="login">
            <label for="email">Identifiant</label>
            <input type="email" v-model="credentials.email" id="email" placeholder="Email :">
            <label for="password">Mot de passe :</label>
            <input type="password" v-model="credentials.password" id="password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive({
  email: '',
  password: '',
})
async function login () {
  try {
    await $fetch('/api/login', { method: 'POST', body: credentials,})

    // Refresh the session on client-side and redirect to the home page
    await refreshSession()
    await navigateTo('/')
  } catch {
    createError({ statusCode: 400, message: 'Connexion impossible' })
  }
}
</script>

<style scoped lang="css">
</style>