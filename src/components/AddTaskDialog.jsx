import "./AddTaskDialog.css";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("morning");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const nodeRef = useRef();

  const handleSaveClick = () => {
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
    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    handleSubmit({
      id: v4(),
      title: title,
      description: description,
      time: time,
      status: "not_started",
    });

    setTitle("");
    setTime("morning");
    setDescription("");

    handleClose();
  };

  const titleError = errors.find(
    (error) => error.inputName === "title",
  )?.message;
  const timeError = errors.find((error) => error.inputName === "time")?.message;
  const descriptionError = errors.find(
    (error) => error.inputName === "description",
  )?.message;

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
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-[#9A9C9F]">
                Insira as informacoes abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  label={"Titulo"}
                  id="title"
                  placeholder="Insira o titulo da tarefa"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  error={titleError}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  error={timeError}
                />

                <Input
                  label={"Descrição"}
                  id="descripton"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  error={descriptionError}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
