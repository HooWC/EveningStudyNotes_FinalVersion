<template>
  <div>
    <h2>Posts</h2>
    <form @submit.prevent="createPost">
      <input v-model="title" placeholder="Title" />
      <textarea v-model="content" placeholder="Content"></textarea>
      <button>Create Post</button>
    </form>

    <div v-if="posts.length">
      <h3>All Posts</h3>
      <ul>
        <li v-for="p in posts" :key="p.PostId">
          <b>{{ p.Title }}</b> - {{ p.Content }} (by {{ p.UserName }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/api'

const title = ref('')
const content = ref('')
const posts = ref([])

async function fetchPosts() {
  try {
    const res = await api.get('/posts')
    posts.value = res.data
  } catch (err) {
    console.error(err)
  }
}

async function createPost() {
  try {
    await api.post('/posts', {
      title: title.value,
      content: content.value
    })
    title.value = ''
    content.value = ''
    await fetchPosts()
  } catch (err) {
    console.error(err.response?.data || err)
  }
}

onMounted(fetchPosts)
</script>