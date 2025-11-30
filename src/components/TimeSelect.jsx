import InputLabel from "./InputLabel";

const TimeSelect = (props) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horario</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-[#ECECEC] px-3 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...props}
      >
        <option value="morning">Manha</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  );
};

export default TimeSelect;
