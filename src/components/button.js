import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/button.module.scss";

const Button = ({ children, link, handleClick }) => {
  return (
    <a
      href={link}
      onClick={(event) => handleClick(event)}
      className={styles.button}
    >
      {children}
    </a>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Button;
