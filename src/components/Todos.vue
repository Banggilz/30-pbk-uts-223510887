<template>
  <div class="q-pa-md">
    <h2 class="text-h4">Data Mahasiswa</h2>
    <q-card class="q-mt-md">
      <q-card-section>
        <q-form @submit.prevent="addTodo">
          <q-input v-model="newTodo" label="Masukkan Nama" dense />
          <q-input v-model="newDate" label="Tanggal" type="datetime-local" dense />
          <q-btn type="submit" color="primary" label="Tambahkan" dense class="q-mt-sm" />
        </q-form>
      </q-card-section>
    </q-card>

    <h2 class="text-h5 q-mt-md">List Item</h2>
    <div>
      <q-card v-for="(todo, index) in todos" :key="index" class="q-mt-md">
        <q-card-section>
          <div class="row items-center">
            <q-checkbox v-model="todo.done" color="primary" />
            <div class="q-mx-md">
              <q-item-label :class="{ 'text-grey-8': todo.done }">{{ todo.text }}</q-item-label>
              <div class="text-caption">{{ todo.date }}</div>
            </div>
            <q-btn dense flat icon="delete" color="negative" @click="removeTodo(index)" />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <q-btn class="q-mt-md" color="negative" label="Remove All" dense @click="removeAllTodos" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QBtn, QCard, QCardSection, QCheckbox, QForm, QInput, QItemLabel } from 'quasar';

// Define reactive state
const todos = ref([]);
const newTodo = ref('');
const newDate = ref('');

// Methods
const addTodo = () => {
  if (newTodo.value.trim().length === 0) {
    return;
  }
  todos.value.push({
    text: newTodo.value,
    done: false,
    date: newDate.value ? new Date(newDate.value).toLocaleString() : new Date().toLocaleString()
  });
  newTodo.value = '';
  newDate.value = '';
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
};

const removeAllTodos = () => {
  todos.value = [];
};
</script>

<style scoped>
.text-h4 {
  font-size: 24px;
  margin-bottom: 10px;
}

.text-h5 {
  font-size: 20px;
  margin-bottom: 10px;
}

.text-caption {
  font-size: 12px;
}

.q-mt-md {
  margin-top: 20px;
}

.q-mx-md {
  margin-left: 16px;
  margin-right: 16px;
}

.row.items-center {
  display: flex;
  align-items: center;
}
</style>
