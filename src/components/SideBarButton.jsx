import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const SideBarButton = ({ children, color }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        unselect: "text-brand-dark-blue",
        selected: "bg-brand-primary/15 text-brand-primary",
      },
    },
  });

  return (
    <a href="" className={sidebar({ color })}>
      {children}
    </a>
  );
};

SideBarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["unselect", "selected"]).isRequired,
};

export default SideBarButton;
