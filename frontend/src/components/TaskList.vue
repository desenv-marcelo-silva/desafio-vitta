<template>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Tarefa</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Duração</th>
        <th>Lembrete</th>
        <th>Última alteração</th>
        <th>&nbsp;</th>
      </tr>
      <tr
        v-for="task in tasks"
        :key="task.id"
      >
        <td>{{ task.id }}</td>
        <td>{{ task.description }}</td>
        <td>{{ formatDate(task.date) }}</td>
        <td>{{ `${task.time}h` }}</td>
        <td class="center">
          {{ `${Number(task.minutes_duration)} min` }}
        </td>
        <td class="center">
          {{ `${task.remember_minutes_before} min` }}
        </td>
        <td class="center">
          {{ taskDateChange(task) }}
        </td>
        <td class="center">
          <div class="action">
            <button
              class="btn_edit"
              @click="editTask(task)"
            >
              Editar
            </button>
            <button
              class="btn_delete"
              @click="delTask(task.id)"
            >
              Apagar
            </button>
          </div>
        </td>
      </tr>
    </thead>
  </table>
</template>

<script>
import { formatDate, formatDateTime } from "@/helpers";

export default {
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    taskDateChange: function (task) {
      const dateTime = task.updated_at ?? task.created_at;
      const dataTask = formatDateTime(dateTime);
      return dataTask;
    },
    formatDate: function (date) {
      return formatDate(date);
    },
    delTask: function (id) {
      this.$emit("deleteTask", id);
    },
    editTask: function (task) {
      this.$emit("editTask", task);
    },
  },
};
</script>

<style></style>
