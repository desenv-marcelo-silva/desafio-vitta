import axios from 'axios'
import TaskRepository from '@/repositories';

const $axios = axios.create({
  baseURL: 'http://127.0.0.1/',
})

const api = {
  create: (task) => TaskRepository($axios).create(task),
  update: (taskId, taskToUpdate) => TaskRepository($axios).update(taskId, taskToUpdate),
  list: () => TaskRepository($axios).list(),
  remove: (taskId) => TaskRepository($axios).delete(taskId)
}

export default api; 