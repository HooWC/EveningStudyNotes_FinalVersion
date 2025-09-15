<template>
  <div>
    <h1>MyApp Vue + Pinia + Router</h1>
    <nav>
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/posts">Posts</router-link> |
      <button v-if="userStore.isAuthenticated" @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useUserStore } from './store/user'
const userStore = useUserStore()

function logout() {
  userStore.logout()
}
</script>