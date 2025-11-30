import { createPortal } from "react-dom";

import Button from "./Button";
import Input from "./Input";

const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 mb-4 text-[#9A9C9F]">Insira as informacoes abaixo</p>
        <div className="flex w-[336px] flex-col space-y-4">
          <Input
            label={"Titulo"}
            id="title"
            placeholder="Insira o titulo da tarefa"
          />
          <Input label={"Horario"} id="time" placeholder="Horario" />
          <Input
            label={"Descrição"}
            id="descripton"
            placeholder="Descreva a tarefa"
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
            <Button size="large" className="w-full">
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AddTaskDialog;
