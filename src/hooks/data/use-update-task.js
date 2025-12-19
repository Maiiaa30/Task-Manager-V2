import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      });
      queryClient.setQueryData(tasksQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask;
          }
          return task;
        });
      });
      queryClient.setQueryData(tasksQueryKeys.getOne(taskId), updatedTask);
    },
  });
};
