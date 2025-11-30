import SideBar from "./components/SideBar";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="flex gap-9">
      <SideBar />
      <Tasks />
    </div>
  );
}

export default App;
