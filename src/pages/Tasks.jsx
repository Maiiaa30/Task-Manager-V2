import SideBar from "../components/SideBar";
import Tasks from "../components/Tasks";

function TasksPage() {
  return (
    <div className="flex">
      <SideBar />
      <Tasks />
    </div>
  );
}

export default TasksPage;
