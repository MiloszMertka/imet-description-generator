import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/controls.module.scss";

import cross from "../assets/images/svg/cross.svg";
import draggableIndicator from "../assets/images/svg/draggable-indicator.svg";

const Controls = ({ handleCrossClick }) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.cross}`}
        onClick={() => handleCrossClick()}
        type="button"
      >
        <img src={cross} alt="Przycisk do usuwania pól" />
      </button>
      <button className={`${styles.button} ${styles.draggable}`} type="button">
        <img src={draggableIndicator} alt="Przycisk do przenoszenia pól" />
      </button>
    </div>
  );
};

Controls.propTypes = {
  handleCrossClick: PropTypes.func.isRequired,
};

export default Controls;
