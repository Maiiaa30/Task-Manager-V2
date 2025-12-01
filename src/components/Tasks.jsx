import { useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import TASKS from "../constants/task";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks.filter((task) => task.time === "evening");

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.success("Tarefa apagada com sucesso!");
  };

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
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
    setTasks(newTasks);
  };

  const handleAddTaskSubmit = (task) => {
    setTasks([...tasks, task]);
    toast.success("Tarefa adicionada com sucesso!");
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
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      {/* Lista de Tarefas */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title={"Manha"} icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title={"Tarde"} icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title={"Noite"} icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
