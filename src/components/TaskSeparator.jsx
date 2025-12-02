import PropTypes from "prop-types";

const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="border-brand-border flex gap-2 border-b border-solid pb-1">
      {icon}
      <p className="text-brand-text-gray text-sm">{title}</p>
    </div>
  );
};

TaskSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default TaskSeparator;
