<template>
    <div>
      <h1>{{ photo.title }}</h1>
      <img :src="photo.url" :alt="photo.title" class="full-size-image" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'PhotoDetail',
    setup() {
      const route = useRoute();
      const photo = ref({});
      const photoId = route.params.id;
  
      onMounted(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
          .then(response => response.json())
          .then(data => {
            photo.value = data;
          });
      });
  
      return {
        photo,
      };
    },
  };
  </script>
  
  <style scoped>
  .full-size-image {
    max-width: 100%;
    height: auto;
  }
  </style>
  