import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, addFlag }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1 style={headingStyle}>{title}</h1>

      {location.pathname === "/" && (
        <Button
          color={addFlag ? "red" : "green"}
          text={!addFlag ? "Add" : "Close"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
const headingStyle = {
  color: "#452E1F",
  backgroundColor: "#F2E0D4",
};

export default Header;
