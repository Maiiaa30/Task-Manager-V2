import SideBarButton from "./SideBarButton";
import HomeIcon from "../assets/icons/home.svg?react";
import TasksIcon from "../assets/icons/tasks.svg?react";

const SideBar = () => {
  return (
    <div className="h-screen w-64 bg-white ">
      <div className="px-8 py-6 space-y-4">
        <h1 className="text-[#00ADB5] text-xl font-semibold">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5]"> organizador de tarefas</span>
        </p>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <SideBarButton variant={"unselect"}>
          <HomeIcon />
          Inicio
        </SideBarButton>
        <SideBarButton variant={"selected"}>
          <TasksIcon />
          Minhas Tarefas
        </SideBarButton>
      </div>
    </div>
  );
};

export default SideBar;
