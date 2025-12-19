import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTaskDetails = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error();
      }
      const deletedTask = await response.json();
      queryClient.setQueryData("tasks", (oldData) => {
        return oldData.filter((oldTask) => oldTask.id !== deletedTask.id);
      });
    },
  });
};
