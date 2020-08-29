import React from "react";
import PropTypes from "prop-types";

import Section from "./section";
import Input from "./input";
import Button from "./button";
import { SECTIONS, KEYS } from "../constants";

const SpecificationSection = ({ data, handleChange, handleButtonClick }) => {
  const rows = data.map((item) => (
    <div key={item.id}>
      <Input
        handleChange={(event) => handleChange(event)}
        id={`${item.id}_label`}
        value={item.label}
        dataSection={SECTIONS.SPECIFICATION}
        dataKey={KEYS.LABEL}
      />
      <Input
        handleChange={(event) => handleChange(event)}
        id={`${item.id}_value`}
        value={item.value}
        dataSection={SECTIONS.SPECIFICATION}
        dataKey={KEYS.VALUE}
      />
    </div>
  ));

  return (
    <Section title={`Dane techniczne`}>
      {rows}
      <Button handleClick={handleButtonClick}>Nowe pole</Button>
    </Section>
  );
};

SpecificationSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default SpecificationSection;
