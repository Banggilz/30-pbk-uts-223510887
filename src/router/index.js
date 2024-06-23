import { createRouter, createWebHistory } from 'vue-router';
import Posts from '../components/Posts.vue';
import Todos from '../components/Todos.vue';
import Albums from '../components/Albums.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';
import PhotoDetail from '../components/PhotoDetail.vue';

const routes = [
  { path: '/post', component: Posts },
  { path: '/todos', component: Todos },
  { path: '/albums', component: Albums },
  { path: '/albums/:id', component: AlbumPhotos },
  { path: '/photos/:id', component: PhotoDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
