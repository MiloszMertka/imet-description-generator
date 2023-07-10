import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../styles/button.module.scss";

const Button = ({ children, link, handleClick, className, disabled = false }) => {
  return link ? (
    <Link to={link} className={`${styles.button} ${className}`}>
      {children}
    </Link>
  ) : (
    <button className={`${styles.button} ${className}`} onClick={(event) => handleClick(event)} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
