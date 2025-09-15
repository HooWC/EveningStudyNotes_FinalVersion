<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button>Login</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/api'
import { useUserStore } from '../store/user'

const email = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()
const userStore = useUserStore()

async function login() {
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    userStore.setUser(res.data.token, { email: email.value })
    message.value = 'Login successful!'
    router.push('/posts')
  } catch (err) {
    message.value = err.response?.data?.message || 'Error'
  }
}
</script>