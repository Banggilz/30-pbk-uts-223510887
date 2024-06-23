<template>
  <div>
    <h2>Albums</h2>
    <div v-for="album in albums" :key="album.id" class="q-mt-md q-card q-px-md q-py-sm">
      <div class="q-gutter-md">
        <div><strong>User ID:</strong> {{ album.userId }}</div>
        <div><strong>Album ID:</strong> {{ album.id }}</div>
        <div><strong>Title:</strong> {{ album.title }}</div>
        <q-btn color="primary" @click="viewPhotos(album.id)">View Photos</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Albums',
  setup() {
    const albums = ref([]);
    const router = useRouter();

    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        albums.value = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    const viewPhotos = (albumId) => {
      router.push(`/albums/${albumId}`);
    };

    onMounted(() => {
      fetchAlbums();
    });

    return {
      albums,
      viewPhotos
    };
  }
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.q-mt-md {
  margin-top: 20px;
}
.q-card {
  border: 1px solid #ddd;
  border-radius: 4px;
}
.q-gutter-md {
  margin: 10px 0;
}
.q-btn {
  margin-top: 10px;
}
</style>
