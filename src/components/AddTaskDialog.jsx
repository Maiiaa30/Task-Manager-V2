import "./AddTaskDialog.css";

import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([]);

  const nodeRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

  const handleSaveClick = () => {
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

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
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="text-brand-text-gray mt-1 mb-4">
                Insira as informacoes abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  label={"Titulo"}
                  id="title"
                  placeholder="Insira o titulo da tarefa"
                  error={titleError}
                  ref={titleRef}
                />

                <TimeSelect
                  ref={timeRef}
                  defaultValue={"morning"}
                  error={timeError}
                />

                <Input
                  label={"Descrição"}
                  id="descripton"
                  placeholder="Descreva a tarefa"
                  error={descriptionError}
                  ref={descriptionRef}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddTaskDialog;
