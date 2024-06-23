<template>
  <div>
    <h2>Postingan</h2>
    <select v-model="selectedUser">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="selectedUser">
      <div v-for="post in filteredPosts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
    <div v-else>
      <p>Silakan pilih untuk melihat postingan mereka.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Define reactive state
const users = ref([]);
const posts = ref([]);
const selectedUser = ref(null);

// Fetch data on mounted
onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      users.value = data;
    });

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      posts.value = data;
    });
});

// Define computed properties
const filteredPosts = computed(() => {
  return posts.value.filter(post => post.userId === parseInt(selectedUser.value));
});
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
