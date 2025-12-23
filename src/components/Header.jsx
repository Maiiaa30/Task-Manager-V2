import PropTypes from "prop-types";
import { useState } from "react";

import { AddIcon, TrashIcon } from "../assets/icons";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";

const Header = ({ subtitle, title }) => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-brand-primary text-xs font-semibold">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button color="ghost">
          Limpar Tarefas
          <TrashIcon />
        </Button>
        <Button onClick={() => setAddTaskDialogIsOpen(true)}>
          Nova Tarefas
          <AddIcon />
        </Button>

        <AddTaskDialog
          isOpen={addTaskDialogIsOpen}
          handleClose={() => setAddTaskDialogIsOpen(false)}
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
