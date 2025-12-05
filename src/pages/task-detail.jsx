import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import SideBar from "../components/SideBar";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
    };
    fetchTask();
  }, [taskId]);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="bg-brand-primary mb-3 flex h-10 w-10 items-center justify-center rounded-full"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span
                onClick={handleBackClick}
                className="text-brand-text-gray cursor-pointer"
              >
                Minhas Tarefas
              </span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button color="danger" className={"w-fit self-end"}>
            <TrashIcon />
            Apagar Tarefa
          </Button>
        </div>

        <div className="bg-brand-white space-y-6 rounded-xl p-6">
          <div>
            <Input id="title" label={"Titulo"} value={task?.title} />
          </div>

          <div>
            <TimeSelect value={task?.time} />
          </div>

          <div>
            <Input
              id="description"
              label={"Descrição"}
              value={task?.description}
              textarea
              rows={4}
            />
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button color="secondary" size="large">
              Cancelar
            </Button>
            <Button color="primary" size="large">
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
