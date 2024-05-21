<template>
    <li>
      <input type="checkbox" v-model="task.completed" @change="updateTask" />
      <span :class="{ 'completed': task.completed }">{{ task.text }}</span>
      <button @click="editTask">Edit</button>
      <button @click="deleteTask">Delete</button>
    </li>
  </template>
  
  <script>
  export default {
    name: 'TaskItem',
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    methods: {
      updateTask() {
        this.$emit('update-task', this.task);
      },
      deleteTask() {
        this.$emit('delete-task', this.task.id);
      },
      editTask() {
        this.$emit('edit-task', this.task);
      },
    },
  };
  </script>
  