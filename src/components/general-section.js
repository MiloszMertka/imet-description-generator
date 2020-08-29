import React from "react";
import PropTypes from "prop-types";
import { SECTIONS } from "../constants";

import Section from "./section";
import Input from "./input";
import Textarea from "./textarea";

const GeneralSection = ({ handleChange, name, description }) => {
  return (
    <Section title={`Charakterystyka`}>
      <Input
        handleChange={handleChange}
        id={SECTIONS.NAME}
        value={name}
        placeholder={`Nazwa urządzenia`}
        dataSection={SECTIONS.NAME}
      />
      <Textarea
        handleChange={handleChange}
        id={SECTIONS.DESCRIPTION}
        value={description}
        placeholder={`Opis urządzenia`}
        dataSection={SECTIONS.DESCRIPTION}
      />
    </Section>
  );
};

GeneralSection.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default GeneralSection;
