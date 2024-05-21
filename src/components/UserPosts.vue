<template>
    <div class="post-list-container">
      <h1 class="title">User Posts</h1>
      <div class="post-input">
        <select v-model="selectedUser" @change="handleFetchPosts" class="user-select">
          <option disabled value="">Select a user</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <ul class="posts">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-body">{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  
  <script>
  export default {
    name: 'PostList',
    props: {
      users: {
        type: Array,
        required: true,
      },
      posts: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        selectedUser: null,
      };
    },
    methods: {
      handleFetchPosts() {
        this.$emit('fetch-posts', this.selectedUser);
      },
    },
  };
  </script>
  <style scoped>
  .post-list-container {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .title {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .post-input {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .user-select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .posts {
    list-style: none;
    padding: 0;
  }
  
  .post-item {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
  }
  
  .post-title {
    color: #5cb85c;
    margin: 0 0 10px 0;
  }
  
  .post-body {
    color: #666;
    font-size: 14px;
  }
  
  /* Tambahkan media queries untuk responsivitas */
  @media (max-width: 768px) {
    .post-list-container {
      padding: 15px;
    }
  }
  
  /* Tambahkan lebih banyak gaya sesuai kebutuhan */
  </style>
  