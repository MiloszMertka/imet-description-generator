import React from "react";
import PropTypes from "prop-types";

const NameResult = ({ name }) => {
  return (
    <p>
      <b className="dsc-nazwa">{name}</b>
    </p>
  );
};

NameResult.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NameResult;
