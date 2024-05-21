<template>
    <div class="task-list-container">
      <h1 class="title">Task List</h1>
      <div class="task-input">
        <input type="text" v-model="newTask" class="task-input-field" placeholder="Add a new task" @keyup.enter="handleAddTask" />
        <button @click="handleAddTask" class="add-btn" :class="{ 'clicked': newTask }">Add</button>
      </div>
      <ul class="task-list">
        <task-item
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @update-task="updateTask"
          @delete-task="deleteTask"
          @edit-task="editTask"
        />
      </ul>
    </div>
  </template>
  
  <script>
  import TaskItem from './TaskItem.vue';
  
  export default {
    name: 'TaskList',
    components: {
      TaskItem,
    },
    props: {
      tasks: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        newTask: '',
      };
    },
    methods: {
      handleAddTask() {
        if (this.newTask.trim()) {
          const newTask = {
            id: Date.now(),
            text: this.newTask,
            completed: false,
          };
          this.$emit('add-task', newTask);
          this.newTask = '';
        }
      },
      updateTask(updatedTask) {
        this.$emit('update-task', updatedTask);
      },
      deleteTask(taskId) {
        this.$emit('delete-task', taskId);
      },
      editTask(task) {
        this.$emit('edit-task', task);
      },
    },
  };
  </script>
  <style scoped>
  .task-list-container {
    background: #f7f7f7;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .title {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .task-input {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .task-input-field {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .add-btn {
    padding: 10px 20px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .add-btn.clicked {
    background-color: #4cae4c;
  }
  
  .task-list {
    list-style: none;
    padding: 0;
  }
  
  /* Tambahkan lebih banyak gaya untuk komponen TaskItem sesuai kebutuhan */
  </style>
  