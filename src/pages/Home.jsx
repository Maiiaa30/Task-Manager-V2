import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from "../assets/icons";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useGetTasks } from "../hooks/data/use-get-tasks";

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress",
  ).length;
  const doneTasks = tasks?.filter((task) => task.status === "done").length;

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Dashboard" subtitle="Dashboard" />

        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<Tasks2Icon />}
            mainText={tasks?.length}
            secondaryText="Tarefas Disponiveis"
          />
          <DashboardCard
            icon={<TasksIcon />}
            mainText={doneTasks}
            secondaryText="Tarefas Concluidas"
          />
          <DashboardCard
            icon={<LoaderIcon className="animate-spin" />}
            mainText={inProgressTasks}
            secondaryText="Tarefas em andamento"
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText="5"
            secondaryText="Agua"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
