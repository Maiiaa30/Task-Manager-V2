import DashboardCards from "../components/DashboardCards";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import TaskItem from "../components/TaskItem";
import { useGetTasks } from "../hooks/data/use-get-tasks";

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Dashboard" subtitle="Dashboard" />
        <DashboardCards />
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6 rounded-[10px] bg-white p-6">
            <div>
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-brand-text-gray text-sm">
                Resumo das tarefas disponíveis
              </span>
            </div>

            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-y-6 rounded-[10px] bg-white p-6">
            <p className="text-brand-dark-gray">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto a tempore animi eaque beatae facilis harum officia,
              illo quisquam. Saepe quos omnis dolore ipsa, porro dolorum fugiat
              cumque suscipit possimus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
