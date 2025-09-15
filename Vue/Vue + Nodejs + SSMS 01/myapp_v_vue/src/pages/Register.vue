<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" placeholder="Email" />
      <input v-model="userName" placeholder="User Name" />
      <input v-model="password" type="password" placeholder="Password" />
      <button>Register</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/api'

const email = ref('')
const userName = ref('')
const password = ref('')
const message = ref('')

async function register() {
  try {
    const res = await api.post('/auth/register', {
      email: email.value,
      userName: userName.value,
      password: password.value
    })
    message.value = res.data.message
  } catch (err) {
    message.value = err.response?.data?.message || 'Error'
  }
}
</script>