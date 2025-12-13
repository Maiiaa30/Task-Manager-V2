import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
  const queryClient = useQueryClient();
  const { taskId } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: updateTask, isPending: updateTaskIsLoading } = useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data.title.trim(),
          description: data.description.trim(),
          time: data.time,
        }),
      });
      if (!response.ok) {
        throw new Error();
      }
      const updatedTask = await response.json();
      queryClient.setQueryData("tasks", (oldData) => {
        return oldData.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updatedTask;
          }
          return oldTask;
        });
      });
    },
  });

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } = useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error();
      }
      const deletedTask = await response.json();
      queryClient.setQueryData("tasks", (oldData) => {
        return oldData.filter((oldTask) => oldTask.id !== deletedTask.id);
      });
    },
  });

  const { data: task } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      reset(data);
    },
  });

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUpdate = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!");
      },
      onError: () => toast.error("Erro ao atualizar tarefa!"),
    });
  };

  const handleDeleteClick = async (data) => {
    deleteTask(data, {
      onSuccess: () => toast.success("Tarefa apagada com sucesso!"),
      onError: () => toast.error("Erro ao apagar tarefa!"),
    });
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

        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="bg-brand-white space-y-6 rounded-xl p-6">
            <div>
              <Input
                id="title"
                label={"Titulo"}
                {...register("title", {
                  required: "O título é obrigatório",
                  validate: (value) => {
                    if (value.trim().length === 0) {
                      return "O título não pode ser vazio";
                    }
                    return true;
                  },
                })}
                error={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register("time", {
                  required: "O horario é obrigatório",
                })}
                error={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label={"Descrição"}
                {...register("description", {
                  required: "A descrição é obrigatória",
                  validate: (value) => {
                    if (value.trim().length === 0) {
                      return "A descrição não pode ser vazia";
                    }
                    return true;
                  },
                })}
                error={errors?.description?.message}
              />
            </div>

            <div className="flex w-full justify-end gap-3">
              <Button
                color="primary"
                size="large"
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
                type="submit"
              >
                {(updateTaskIsLoading || deleteTaskIsLoading) && (
                  <LoaderIcon className="mr-2 animate-spin" />
                )}
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
