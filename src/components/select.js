import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/select.module.scss";

const Select = ({ id, value, handleChange, dataSection, dataKey, options }) => {
  return (
    <select
      className={styles.select}
      id={id}
      name={id}
      value={value}
      onChange={(event) => handleChange(event)}
      data-section={dataSection}
      data-key={dataKey}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataSection: PropTypes.string,
  dataKey: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

export default Select;
