<template>
    <div>
      <h1>Photos in Album {{ $route.params.id }}</h1>
      <q-list>
        <q-item v-for="photo in photos" :key="photo.id" clickable @click="goToPhoto(photo.id)">
          <q-item-section>
            <img :src="photo.thumbnailUrl" :alt="photo.title" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    name: 'AlbumPhotos',
    setup() {
      const photos = ref([]);
      const route = useRoute();
      const router = useRouter();
      const albumId = route.params.id;
  
      onMounted(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
          .then(response => response.json())
          .then(data => {
            photos.value = data;
          });
      });
  
      const goToPhoto = (photoId) => {
        router.push(`/photos/${photoId}`);
      };
  
      return {
        photos,
        goToPhoto,
      };
    },
  };
  </script>
  