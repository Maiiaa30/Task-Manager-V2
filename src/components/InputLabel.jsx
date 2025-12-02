import PropTypes from "prop-types";

const InputLabel = (props) => {
  return (
    <label className="text-sm font-semibold text-[#35383F]" {...props}>
      {props.children}
    </label>
  );
};

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputLabel;
