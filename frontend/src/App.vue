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
       <button type="submit">Gravar</button>
     </div>
    </form>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Tarefa</th>
          <th>Data/Hora</th>
          <th>Duração</th>
          <th>Lembrete</th>
          <th>Última alteração</th>
          <th>&nbsp;</th>
        </tr>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.description }}</td>
          <td>{{ taskDateTime(task.taskDateAndTime) }}</td>
          <td class="center">{{ task.minutes_duration }}</td>
          <td class="center">{{ task.remember_minutes_before }}</td>
          <td class="center">{{ taskDateChange(task) }}</td>
          <td class="center">
            <div class="action">
              <button class="btn_edit" @click="edit(task)">Editar</button>
              <button class="btn_delete" @click="delTask(task.id)">Apagar</button>
            </div>
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import moment from 'moment';

const tasks = [{
  id: 1,
  description: 'Do a pull-request',
  task_date: new Date(),
  task_time: new Date(),
  minutes_duration: 15,
  remember_minutes_before: 5,
  created_at: new Date(),
  updated_at: new Date(),
  removed_at: new Date(),
},{
  id: 2,
  description: 'Go out',
  task_date: new Date(),
  task_time: new Date(),
  minutes_duration: 10,
  remember_minutes_before: 5,
  created_at: new Date(),
  updated_at: new Date(),
  removed_at: new Date(),
},{
  id: 3,
  description: 'Planning a day',
  task_date: new Date(),
  task_time: new Date(),
  minutes_duration: 5,
  remember_minutes_before: 5,
  created_at: new Date(),
  updated_at: new Date(),
  removed_at: new Date(),
}];

export default {
  name: 'App',
  data() {
    return {
      tasks,
      taskDescription: "",
      taskDate: 0,
      taskTime: 0,
      taskDuration: 0,
      taskRemember: 0,
    }
  },
  methods: {
    save: function(e) {
      e.preventDefault();
      const newId = this.tasks.length === 0 ? 1 : this.tasks[this.tasks.length-1].id + 1;
      this.tasks.push({
        id: newId,
        description: this.taskDescription,
        task_date: this.taskDate,
        task_time: this.taskTime,
        minutes_duration: this.taskDuration,
        remember_minutes_before: this.taskRemember,
        created_at: new Date()
      });
      this.clearFields();
    },
    edit: function(task) {
      this.toForm(task);
    },
    delTask: function(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    clearFields() {
      this.taskRemember = 0;
      this.taskDescription = "";
      this.taskDate = 0;
      this.taskTime = 0;
      this.taskDuration = 0;
  },
    taskDateChange: function(task) {
      const dateTime = task.updated_at ?? task.created_at;
      const dataTask = this.taskDateTime(dateTime);
      return dataTask;
    },
    taskDateTime: function(date) {
      return moment(date).format('DD/MM/yyyy HH:mm');
    },
    toForm: function(task) {
      this.taskRemember = task.remember_minutes_before;
      this.taskDescription = task.description;
      this.taskDate = moment(task.task_date).format('DD/MM/yyyy hh:mm:ss');
      this.taskTime = moment(task.task_time).format("hh:mm:ss a")
      this.taskDuration = task.minutes_duration;
    }
  },
  components: {
    Header
  }
}
</script>

<style>

body {
  max-width: 70rem !important;
  margin: 0 auto;
}

#app {
  width: max-content;
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

.center {
  text-align: center;
}
</style>
