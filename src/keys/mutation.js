export const tasksMutationKeys = {
  add: () => ["addTask"],
  update: (taskId) => ["updateTask", taskId],
  delete: (taskId) => ["deleteTask", taskId],
};
