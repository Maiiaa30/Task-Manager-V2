import { useQuery } from "@tanstack/react-query";

import { tasksQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useGetTasks = () => {
  return useQuery({
    queryKey: tasksQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get("/tasks");
      return tasks;
    },
  });
};
