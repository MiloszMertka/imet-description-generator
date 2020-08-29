import React from "react";
import PropTypes from "prop-types";

import cross from "../assets/images/svg/cross.svg";
import draggableIndicator from "../assets/images/svg/draggable-indicator.svg";

const Controls = ({ handleCrossClick }) => {
  return (
    <div>
      <img
        src={cross}
        alt="Przycisk do usuwania pól"
        onClick={() => handleCrossClick()}
      />
      <img src={draggableIndicator} alt="Przycisk do przenoszenia pól" />
    </div>
  );
};

Controls.propTypes = {
  handleCrossClick: PropTypes.func.isRequired,
};

export default Controls;
