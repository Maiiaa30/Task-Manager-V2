import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";

const Input = ({ label, error, ref, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-3 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
        ref={ref}
      />
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
    </div>
  );
};

export default Input;
