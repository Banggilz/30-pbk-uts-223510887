<template>
  <div class="latar">
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#" @click.prevent="setView('post')">Post</a></li>
            <li><a href="#" @click.prevent="setView('todos')">Todos</a></li>
          </ul>
        </nav>
      </header>
      
      <div v-if="currentView === 'todos'">
        <h1>Task List</h1>
        <div class="task-input">
          <input type="text" v-if="!editMode" placeholder="Add a new task" v-model="newTask" @keyup.enter="addTask">
          <button @click="addOrSaveTask" :class="{ 'clicked': !editMode && newTask, 'edit-mode': editMode }">{{ editMode ? 'Save' : 'Add' }}</button>
        </div>
        <div class="filters">
          <span :class="{ 'active': filter == 'all' }" @click="setFilter('all')">All</span>
          <span :class="{ 'active': filter == 'pending' }" @click="setFilter('pending')">Pending</span>
          <span :class="{ 'active': filter == 'completed' }" @click="setFilter('completed')">Completed</span>
          <span class="sort-icon" @click="toggleSortDirection">Sort {{ sortDirection }}</span>
        </div>

        <ul>
          <li v-for="task in filteredTasks" :key="task.id">
            <input type="checkbox" v-model="task.completed" @change="updateTask(task)">
            <span :class="{ 'completed': task.completed, 'edit-mode': editMode && task === editedTask }">
              <template v-if="editMode && task === editedTask">
                <input type="text" v-model="task.text">
              </template>
              <template v-else>
                {{ task.text }}
              </template>
            </span>
            <button @click="editTask(task)" v-if="!editMode">Edit</button>
            <button @click="deleteTask(task)">Delete</button>
          </li>
        </ul>
      </div>

      <div v-if="currentView === 'post'">
        <h1>User Posts</h1>
        <div class="post-input">
          <select v-model="selectedUser" @change="fetchPosts">
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
          </select>
        </div>
        <ul class="posts">
          <li v-for="post in posts" :key="post.id" class="post-item">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      currentView: 'todos', // 'todos' or 'post'
      newTask: '',
      tasks: [],
      filter: 'all',
      sort: 'asc',
      editMode: false,
      editedTask: null,
      users: [],
      selectedUser: null,
      posts: [],
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'all') {
        return this.tasks;
      } else if (this.filter === 'pending') {
        return this.tasks.filter((task) => !task.completed);
      } else if (this.filter === 'completed') {
        return this.tasks.filter((task) => task.completed);
      }
    },
    sortDirection() {
      return this.sort === 'asc' ? 'A-Z' : 'Z-A';
    },
  },
  methods: {
    addTask() {
      if (!this.newTask) return;

      const newTask = {
        id: this.tasks.length > 0 ? Math.max(...this.tasks.map((task) => task.id)) + 1 : 1,
        text: this.newTask,
        completed: false,
      };

      this.tasks.push(newTask);
      this.newTask = '';
    },
    updateTask(task) {
      task.completed = !task.completed;
    },
    deleteTask(task) {
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
    },
    setFilter(filter) {
      this.filter = filter;
    },
    toggleSortDirection() {
      this.sort = this.sort === 'asc' ? 'desc' : 'asc';
      this.sortTasks();
    },
    sortTasks() {
      this.tasks.sort((a, b) => {
        if (this.sort === 'asc') {
          return a.text.localeCompare(b.text);
        } else {
          return b.text.localeCompare(a.text);
        }
      });
    },
    editTask(task) {
      this.editMode = true;
      this.editedTask = task;
    },
    addOrSaveTask() {
      if (this.editMode) {
        this.saveEditedTask();
      } else {
        this.addTask();
      }
    },
    saveEditedTask() {
      if (!this.editedTask.text) return;

      this.editMode = false;
      this.editedTask = null;
    },
    cancelEdit() {
      this.editMode = false;
      this.editedTask = null;
    },
    setView(view) {
      this.currentView = view;
    },
    async fetchUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.users = await response.json();
    },
    async fetchPosts() {
      if (!this.selectedUser) return;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
      this.posts = await response.json();
    },
  },
  mounted() {
    this.sortTasks();
    this.fetchUsers();
  },
};
</script>

<style>
.latar {
  background: none;
  background: url(/src/assets/gambarr1.jpg);
  width: 1000px;
  height: 600px;
  border-radius: 40px;
  background-size: cover;
  background-position: center;
  padding: 20px;
}

header {
  background-color: #333;
  color: white;
  padding: 10px 0;
  text-align: center;
  border-radius: 10px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin: 0 10px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}

.task-input, .post-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-input input[type="text"], .post-input select {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #080808;
  margin-right: 10px;
  flex: 1;
}

.task-input button {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #4CAF50;
  color: #030303;
  border: none;
  cursor: pointer;
}

.task-input button.clicked {
  background-color: #008CBA;
}

.filters {
  margin-bottom: 10px;
}

.filters span {
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  cursor: pointer;
}

.filters span.active {
  background-color: #4CAF50;
  color: #fff;
}

.sort-icon {
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.sort-icon:hover {
  background-color: #eee;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

li input[type="checkbox"] {
  margin-right: 10px;
}

li span {
  flex: 1;
  font-size: 16px;
}

li span.completed {
  text-decoration: line-through;
  color: #0f0f0f;
}

li button {
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #f44336;
  color: #0a0909;
  border: none;
  cursor: pointer;
}

li button:hover {
  background-color: #e53935;
}

li button.clicked {
  background-color: #008CBA;
}

.posts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
}

.post-item h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.post-item p {
  margin: 5px 0 0;
  font-size: 16px;
  color: #666;
}
</style>
