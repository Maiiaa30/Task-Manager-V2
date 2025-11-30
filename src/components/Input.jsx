const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <label htmlFor={rest.id} className="text-sm font-semibold text-[#35383F]">
        {label}
      </label>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-3 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
    </div>
  );
};

export default Input;
