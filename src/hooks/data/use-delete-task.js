import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tasksMutationKeys } from "../../keys/mutation";
import { tasksQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: tasksMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);
      return deletedTask;
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(tasksQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id);
      });
    },
  });
};
