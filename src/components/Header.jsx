import PropTypes from "prop-types";

const Header = (props) => {
  return <header className="">{props.children}</header>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
