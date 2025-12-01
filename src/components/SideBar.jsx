import { HomeIcon, TasksIcon } from "../assets/icons";
import SideBarButton from "./SideBarButton";

const SideBar = () => {
  return (
    <div className="h-screen w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-brand-primary text-xl font-semibold">
          Task Manager
        </h1>
        <p>
          Um simples{" "}
          <span className="text-brand-primary"> organizador de tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SideBarButton color={"unselect"}>
          <HomeIcon />
          Inicio
        </SideBarButton>
        <SideBarButton color={"selected"}>
          <TasksIcon />
          Minhas Tarefas
        </SideBarButton>
      </div>
    </div>
  );
};

export default SideBar;
