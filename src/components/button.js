import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/button.module.scss";

const Button = ({ children, link, handleClick, className }) => {
  return (
    <a
      href={link}
      onClick={(event) => handleClick(event)}
      className={`${styles.button} ${className}`}
      role={!link ? "button" : null}
    >
      {children}
    </a>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  handleClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
