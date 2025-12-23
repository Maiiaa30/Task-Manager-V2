import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons";
import { useGetTasks } from "../hooks/data/use-get-tasks";
import Header from "./Header";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";

const Tasks = () => {
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks?.filter((task) => task.time === "evening");

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />

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
            <TaskItem task={task} key={task.id} />
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
            <TaskItem task={task} key={task.id} />
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
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
