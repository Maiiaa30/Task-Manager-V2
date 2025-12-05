import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import SideBar from "../components/SideBar";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const [errors, setErrors] = useState([]);
  const [saveIsLoading, setSaveIsLoading] = useState(false);

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

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

  const handleSubmit = async () => {
    setSaveIsLoading(true);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    const newErrors = [];

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      });
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O período é obrigatório.",
      });
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      });
    }

    const taskFinal = {
      title: title,
      description: description,
      time: time,
    };

    setErrors(newErrors);

    if (newErrors.length > 0) {
      setSaveIsLoading(false);
      return toast.error("Por favor, corrija os erros no formulário.");
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(taskFinal),
    });
    if (!response.ok) {
      setSaveIsLoading(false);
      return toast.error("Erro ao atualizar tarefa!");
    }

    const newTask = await response.json();
    setTask(newTask);

    setSaveIsLoading(false);
    toast.success("Tarefa atualizada com sucesso!");
  };

  const titleError = errors.find(
    (error) => error.inputName === "title",
  )?.message;
  const timeError = errors.find((error) => error.inputName === "time")?.message;
  const descriptionError = errors.find(
    (error) => error.inputName === "description",
  )?.message;

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      return toast.error("Erro ao apagar tarefa!");
    }
    navigate(-1);
    toast.success("Tarefa apagada com sucesso!");
  };

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
              <Link to={"/"} className="text-brand-text-gray cursor-pointer">
                Minhas Tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            color="danger"
            className={"w-fit self-end"}
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Apagar Tarefa
          </Button>
        </div>

        <div className="bg-brand-white space-y-6 rounded-xl p-6">
          <div>
            <Input
              id="title"
              label={"Titulo"}
              defaultValue={task?.title}
              ref={titleRef}
              error={titleError}
            />
          </div>

          <div>
            <TimeSelect
              defaultValue={task?.time}
              ref={timeRef}
              error={timeError}
            />
          </div>

          <div>
            <Input
              id="description"
              label={"Descrição"}
              defaultValue={task?.description}
              ref={descriptionRef}
              error={descriptionError}
            />
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={saveIsLoading}
            >
              {saveIsLoading && <LoaderIcon className="mr-2 animate-spin" />}
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
