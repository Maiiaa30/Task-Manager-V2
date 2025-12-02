import PropTypes from "prop-types";

import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";

const TimeSelect = ({ ref, ...props }) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horario</InputLabel>
      <select
        id="time"
        className="outline-brand-primary placeholder:text-brand-text-gray border-brand-border rounded-lg border border-solid px-3 py-3 placeholder:text-sm"
        {...props}
        ref={ref}
      >
        <option value="morning">Manha</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {props.error && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </div>
  );
};

TimeSelect.propTypes = {
  error: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default TimeSelect;
