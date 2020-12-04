<template>
  <div id="app">
        <h1>Welcome to Vitta Stone</h1>
    <h3>Task list</h3>
    <form
    @submit="saveTask">
      <label 
        for="task_description">Tarefa</label>
      <input 
        id="task_description" 
        type="text" 
        v-model="taskDescription" />
        <button type="submit">Gravar</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.description }}</li>
    </ul>
  </div>
</template>

<script>
const tasks = [{
  id: 0,
  description: 'Do a pull-request',
  datetime: new Date(),
  minutes_duration: 15,
  remember_minutes_before: 5,
  created_at: new Date(),
  modified_at: new Date(),
  removed_at: new Date(),
},{
  id: 1,
  description: 'Go out',
  datetime: new Date(),
  minutes_duration: 10,
  remember_minutes_before: 5,
  created_at: new Date(),
  modified_at: new Date(),
  removed_at: new Date(),
},{
  id: 3,
  description: 'Planning a day',
  datetime: new Date(),
  minutes_duration: 5,
  remember_minutes_before: 5,
  created_at: new Date(),
  modified_at: new Date(),
  removed_at: new Date(),
}];

export default {
  name: 'App',
  data() {
    return {
      tasks,
      taskDescription: ""
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
  }
}
</script>

<style>
#app {
}
</style>
