import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/input.module.scss";

const Input = ({
  type,
  placeholder,
  id,
  value,
  handleChange,
  dataSection,
  dataKey,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={(event) => handleChange(event)}
      data-section={dataSection}
      data-key={dataKey}
    />
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "email",
    "tel",
    "number",
    "password",
    "search",
    "url",
  ]).isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataSection: PropTypes.string,
  dataKey: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
};

export default Input;
