<template>
  <div id="app">
    <Header />

    <form
      @submit="save">
      <div class="task_name">
        <label 
          for="task_description">Tarefa</label>
        <input 
          id="task_description" 
          type="text" 
          v-model="taskDescription" />
      </div>
      
      <div class="task_info">
        <div>
          <label for="task_date">Data</label>
          <input 
            id="task_date"
            type="date"
            v-model="taskDate" />
        </div>

        <div>
          <label for="task_time">Hora</label>
          <input 
            id="task_time"
            type="time"
            step="300"
            v-model="taskTime" />
        </div>


        <div>
        <label for="task_duration">Duração</label>
          <input 
            id="task_duration"
            type="number"
            step="5"
            min="0"
            v-model="taskDuration" />
        </div>
       
        <div>
        <label for="task_remember">Lembrar</label>
        <input 
            id="task_remember"
            type="number"
            step="5"
            min="0"
            v-model="taskRemember" />
        </div>
     </div>
      <div>
        <button type="submit">Salvar</button>
      </div>
    </form>

    <hr />
    <div class="render_filter">
      <div class="render_filter__freq">
        <h4>Filtrar tarefas por frequência</h4>

        <select v-model="renderFilter">
          <option value="day">Dia</option>
          <option value="week">Semana</option>
          <option value="month">Mês</option>
        </select>
      </div>
      <div class="render_filter__status">
        <h4>Filtrar tarefas por status</h4>

        <select v-model="renderFilterStatus">
          <option value="done">Realizadas</option>
          <option value="open">Não realizadas</option>
          <option value="all">Todas</option>
        </select>
      </div>
    </div>

    <TaskList 
      :tasks="tasks" 
      @deleteTask="deleteTask"
      @editTask="editTask"
      />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import TaskList from './components/TaskList.vue';

import api from './services/service.js'

const tasks = [];

export default {
  name: 'App',
  created: async function() {
    const res = await api.get('tasks');
    this.tasks = res.data;
  },
  data() {
    return {
      tasks,
      taskDescription: "",
      taskDate: 0,
      taskTime: 0,
      taskDuration: 0,
      taskRemember: 0,
      taskId: 0,
      renderFilter: 'week',
      renderFilterStatus: 'all'
    }
  },
  methods: {
    save: async function(e) {
      e.preventDefault();
      const _task = this.formToTask();
      if (this.taskId > 0) {
        _task.id = this.taskId;
        _task.updated_at = new Date();
        const UpdatedTask = await api.patch(`tasks/${this.taskId}`, _task);
        const tempTask = this.tasks.find(task => task.id === this.taskId);
        Object.assign(tempTask, UpdatedTask.data);
      } else {
        _task.created_at = new Date();
        const newTask = await api.post('tasks', _task);
        this.tasks.push(newTask.data);
      }
      this.clearFields();
    },
    editTask: function(task) {
      this.taskToForm(task);
    },
    deleteTask: async function(id) {
      if (window.confirm('Confirma?')) {
        await api.delete(`tasks/${id}`);
        this.tasks = this.tasks.filter(task => task.id !== id);
      }
    },
    clearFields() {
      this.taskRemember = 0;
      this.taskDescription = "";
      this.taskDate = 0;
      this.taskTime = 0;
      this.taskDuration = 0;
      this.taskId = 0;
    },
    taskToForm: function(task) {
      this.taskRemember = task.remember_minutes_before;
      this.taskDescription = task.description;
      this.taskDate = task.task_date;
      this.taskTime = task.task_time;
      this.taskDuration = task.minutes_duration;
      this.taskId = task.id;
    },
    formToTask: function() {
      return {
        description: this.taskDescription,
        task_date: this.taskDate,
        task_time: this.taskTime,
        minutes_duration: this.taskDuration,
        remember_minutes_before: this.taskRemember,
      }
    }
  },
  components: {
    Header,
    TaskList
  }
}
</script>

<style>

body {
  margin: unset !important;
  max-width: unset !important;
}

#app {
  width: max-content;
  margin: 0 auto;
}

form {
  display: flex;
  flex-direction: column;
}

form div {
  width: 100%;
}

div.task_name > input {
  width: 100%;
}

div.task_info {
  display: flex;
  justify-content: space-between;
}

div.task_info div {
  margin-right: 0.5rem;
}

div.task_info input[type='datetime-local'] {
  height: 3.4rem;
  margin-right: 1rem;
}

div.action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  width: 8rem;
}

button.btn_edit {
  background-color: #00acFF;
  margin-right: 0.25rem;
}

button.btn_delete {
  background-color: #ff0000;
}

.render_filter {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.render_filter h4 {
  margin: 0 2rem 1rem 0;
}

.render_filter select {
  margin: 0;
  width: 20rem;
}

.center {
  text-align: center;
}
</style>
