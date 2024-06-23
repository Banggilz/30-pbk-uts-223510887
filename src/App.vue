<template>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <q-toolbar class="header-toolbar">
        <nav class="app-nav">
          <ul>
            <li><q-btn flat @click="navigateTo('/post')" class="nav-link">Post</q-btn></li>
            <li><q-btn flat @click="navigateTo('/todos')" class="nav-link">Todos</q-btn></li>
            <li><q-btn flat @click="navigateTo('/albums')" class="nav-link active">Albums</q-btn></li>
          </ul>
        </nav>
        <div class="title-container">
          <q-toolbar-title class="text-center">Data Nama Mahasiswa</q-toolbar-title>
        </div>
        <div class="menu-icon-container">
          <q-btn flat round dense icon="menu" @click="drawer = !drawer" class="q-mr-sm" />
        </div>
      </q-toolbar>
    </header>

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="footer">
      <q-toolbar>
        <q-space />
        <q-toolbar-title>© Gilang Rahmadani 223510887</q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const drawer = ref(false);

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
/* Common styles */
body {
  background-image: url('https://assets.pepnews.com/img/2y1580622101455/ba6de-sewa%20mobil%20rental.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  font-family: Arial, sans-serif;
  color: #333; /* Default text color */
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure full height layout */
}

.app-header {
  background-color: #1976d2; /* Blue background for header */
  color: #fff; /* White text color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px; /* Add padding to the header */
}

.header-toolbar {
  width: 100%;
  max-width: 1200px; /* Limit max width of header */
  margin: 0 auto; /* Center the header horizontally */
  display: flex;
  justify-content: space-between; /* Space evenly between elements */
  align-items: center; /* Center items vertically */
}

.app-nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center; /* Center items vertically */
}

.app-nav .nav-link {
  text-decoration: none;
  color: inherit;
  padding: 10px;
  transition: background-color 0.3s;
}

.app-nav .nav-link.active {
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background for active link */
  border-radius: 5px; /* Rounded corners for active link */
}

.title-container {
  flex: 1; /* Expand to fill remaining space */
  text-align: center; /* Center text horizontally */
}

.menu-icon-container {
  margin-left: 20px; /* Add margin for spacing */
}
.menu-icon-container q-btn {
  color: #fff; /* Ensure icon color matches header text */
}

.q-page-container {
  flex: 1; /* Allow main content to grow and fill remaining space */
}

.q-footer {
  background-color: #f0f0f0; /* Light gray background for footer */
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  position: center;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
}
</style>
