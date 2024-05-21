<template>
  <div class="app-container">
    <header class="app-header">
      <nav class="app-nav">
        <ul>
          <li><a href="#" @click.prevent="setView('post')" class="nav-link">Post</a></li>
          <li><a href="#" @click.prevent="setView('todos')" class="nav-link">Todos</a></li>
        </ul>
      </nav>
    </header>

    <main class="app-main">
      <div v-if="currentView === 'todos'" class="task-view">
        <task-list :tasks="tasks" @update-task="updateTask" @delete-task="deleteTask" @add-task="addTask" @edit-task="editTask" />
      </div>

      <div v-if="currentView === 'post'" class="post-view">
        <post-list :users="users" :posts="posts" @fetch-posts="fetchPosts" />
      </div>
    </main>
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import PostList from './components/UserPosts.vue';

export default {
  name: 'App',
  components: {
    TaskList,
    PostList,
  },
  data() {
    return {
      currentView: 'todos',
      tasks: [],
      users: [],
      posts: [],
    };
  },
  methods: {
    setView(view) {
      this.currentView = view;
    },
    addTask(newTask) {
      this.tasks.push(newTask);
    },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    async fetchUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.users = await response.json();
    },
    async fetchPosts(userId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      this.posts = await response.json();
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<style scoped>
.app-container {
  font-family: 'Arial', sans-serif;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
}

.app-header {
  background-color: #4CAF50;
  padding: 10px 0;
  text-align: center;
}

.app-nav ul {
  list-style-type: none;
  padding: 0;
}

.app-nav .nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.app-main {
  margin-top: 20px;
}

.task-view, .post-view {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Tambahkan lebih banyak gaya sesuai kebutuhan */
</style>
