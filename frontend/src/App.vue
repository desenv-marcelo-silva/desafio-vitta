<template>
  <div id="app">
    <Header />
    <form
      @submit="saveTask">
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
        <label for="date_time">Data e hora</label>
        <input 
          id="date_time"
          type="datetime-local"
          v-model="taskDateAndTime" />
        </div>

        <div>
        <label for="task_duration">Duração</label>
          <input 
            id="task_duration"
            type="number"
            v-model="taskDuration" />
        </div>
       
        <div>
        <label for="task_remember">Lembrar</label>
        <input 
            id="task_remember"
            type="number"
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
        </tr>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.description }}</td>
          <td>{{ taskDateTime(task) }}</td>
          <td class="center">{{ task.minutes_duration }}</td>
          <td class="center">{{ task.remember_minutes_before }}</td>
          <td class="center">{{ taskDateChange(task) }}</td>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import moment from 'moment';

const tasks = [{
  id: 0,
  description: 'Do a pull-request',
  datetime: new Date(),
  minutes_duration: 15,
  remember_minutes_before: 5,
  created_at: new Date(),
  updated_at: new Date(),
  removed_at: new Date(),
},{
  id: 1,
  description: 'Go out',
  datetime: new Date(),
  minutes_duration: 10,
  remember_minutes_before: 5,
  created_at: new Date(),
  updated_at: new Date(),
  removed_at: new Date(),
},{
  id: 3,
  description: 'Planning a day',
  datetime: new Date(),
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
      taskDateAndTime: "",
      taskDuration: 0,
      taskRemember: 0,
    }
  },
  methods: {
    saveTask: function(e) {
      e.preventDefault();
      const newId = this.tasks[this.tasks.length-1].id + 1;
      this.tasks.push({
        id: newId,
        description: this.taskDescription,
        datetime: new Date(),
        minutes_duration: 5,
        remember_minutes_before: 5,
        created_at: new Date()
      });
    },
    taskDateChange: function(task) {
      const dateTime = task.updated_at ?? task.created_at;
      const dataTask = this.taskDateTime(dateTime);
      return dataTask;
    },
    taskDateTime: function(date) {
      return moment(date).format('DD/MM/yyyy HH:mm');
    },
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

.center {
  text-align: center;
}
</style>
