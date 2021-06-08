import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/textarea.module.scss";

const Textarea = ({
  id,
  cols,
  rows,
  placeholder,
  value,
  handleChange,
  dataSection,
  dataKey,
}) => {
  return (
    <textarea
      className={styles.textarea}
      name={id}
      id={id}
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(event) => handleChange(event)}
      data-section={dataSection}
      data-key={dataKey}
    />
  );
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataSection: PropTypes.string,
  dataKey: PropTypes.string,
};

Textarea.defaultProps = {
  cols: 30,
  rows: 10,
};

export default Textarea;
