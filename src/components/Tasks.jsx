import Button from "./Button";
import AddIcon from "../assets/icons/add.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import TaskSeparator from "./TaskSeparator";
import { useState } from "react";
import TASKS from "../constants/task";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);
  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks.filter((task) => task.time === "evening");

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      if (task.status === "not_started") {
        return { ...task, status: "in_progress" };
      }
      if (task.status === "in_progress") {
        return { ...task, status: "done" };
      }
      if (task.status === "done") {
        return { ...task, status: "not_started" };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"ghost"}>
            Limpar Tarefas
            <TrashIcon />
          </Button>
          <Button>
            Nova Tarefas
            <AddIcon />
          </Button>
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
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title={"Tarde"} icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title={"Noite"} icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
