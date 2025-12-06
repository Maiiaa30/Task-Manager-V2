import "./AddTaskDialog.css";

import PropTypes from "prop-types";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { toast } from "sonner";
import { v4 } from "uuid";

import { LoaderIcon } from "../assets/icons";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      time: "morning",
    },
  });

  const nodeRef = useRef(null);

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time.trim(),
      status: "not_started",
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      return toast.error("Erro ao adicionar tarefa!");
    }

    onSubmitSuccess(task);
    handleClose();
    reset({
      title: "",
      description: "",
      time: "morning",
    });
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-brand-text-gray mt-1 mb-4">
                Insira as informacoes abaixo
              </p>
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  label={"Titulo"}
                  id="title"
                  placeholder="Insira o titulo da tarefa"
                  error={errors?.title?.message}
                  disabled={isSubmitting}
                  {...register("title", {
                    required: "O título é obrigatório",
                    validate: (value) => {
                      if (value.trim().length === 0) {
                        return "O título não pode ser vazio";
                      }
                    },
                  })}
                />

                <TimeSelect
                  defaultValue={"morning"}
                  error={errors?.time?.message}
                  disabled={isSubmitting}
                  {...register("time", {
                    required: "O horario é obrigatório",
                  })}
                />

                <Input
                  label={"Descrição"}
                  id="descripton"
                  placeholder="Descreva a tarefa"
                  disabled={isSubmitting}
                  error={errors?.description?.message}
                  {...register("description", {
                    required: "A descrição é obrigatória",
                    validate: (value) => {
                      if (value.trim().length === 0) {
                        return "A descrição não pode ser vazia";
                      }
                      return true;
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <LoaderIcon className="mr-2 animate-spin" />
                    )}
                    Guardar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddTaskDialog;
