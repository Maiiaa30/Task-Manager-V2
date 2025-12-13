import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";

const Tasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      });
      const tasks = await response.json();
      return tasks;
    },
  });

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const morningTasks = tasks?.filter((task) => task.time === "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks?.filter((task) => task.time === "evening");

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks?.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      if (task.status === "not_started") {
        toast.success("Tarefa em progresso!");
        return { ...task, status: "in_progress" };
      }
      if (task.status === "in_progress") {
        toast.success("Tarefa concluída!");
        return { ...task, status: "done" };
      }
      if (task.status === "done") {
        toast.success("Tarefa reiniciada!");
        return { ...task, status: "not_started" };
      }
      return task;
    });
    queryClient.setQueryData(["tasks"], newTasks);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-brand-primary text-xs font-semibold">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar Tarefas
            <TrashIcon />
          </Button>
          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova Tarefas
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>

      {/* Lista de Tarefas */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title={"Manha"} icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              Nenhuma tarefa para este período.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title={"Tarde"} icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              Nenhuma tarefa para este período.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title={"Noite"} icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              Nenhuma tarefa para este período.
            </p>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
