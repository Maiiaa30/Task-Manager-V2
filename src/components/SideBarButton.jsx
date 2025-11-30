const SideBarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "unselect") {
      return "text-[#35383E]";
    }
    if (variant === "selected") {
      return "bg-[#E6F7F8] text-[#00ADB5]";
    }
  };
  return (
    <a
      href=""
      className={`px-6 py-3 flex items-center gap-2 rounded-lg ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
};

export default SideBarButton;
