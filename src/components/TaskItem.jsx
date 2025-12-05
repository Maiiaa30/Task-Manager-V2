import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";

const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error("Erro ao apagar tarefa!");
    }
    onDeleteSuccess(task.id);
    toast.success("Tarefa apagada com sucesso!");
    setDeleteIsLoading(false);
  };

  const getStatusStyles = () => {
    if (task.status === "done") {
      return "bg-brand-primary/10 text-brand-primary";
    }
    if (task.status === "in_progress") {
      return "bg-brand-process/10 text-brand-process";
    }
    if (task.status === "not_started") {
      return "bg-brand-dark-blue/10 text-brand-dark-blue";
    }
  };
  const getStatusStylesCheck = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary";
    }
    if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process";
    }
    if (task.status === "not_started") {
      return "bg-brand-dark-blue/10 text-brand-dark-blue";
    }
  };
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${getStatusStyles()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusStylesCheck()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-[#E6F7F8]" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    timeOfDay: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default TaskItem;
