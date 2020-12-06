const TaskRepository = (api) => {
  return {
    create: (task) => api.post('tasks', task),
    update: (taskId, taskToUpdate) => api.put(`tasks/${taskId}`, taskToUpdate),
    list: () => api.get('tasks'),
    remove: (taskId) => api.delete(`tasks/${taskId}`),
  }
}
export default TaskRepository
