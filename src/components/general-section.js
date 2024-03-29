import React from "react";
import PropTypes from "prop-types";
import { SECTIONS } from "../constants";

import formSection from "../styles/form-section.module.scss";

import Section from "./section";
import Input from "./input";
import RichTextEditor from "./rich-text-editor";

const GeneralSection = ({ handleChange, name, description }) => {
  return (
    <Section title={`Charakterystyka`}>
      <div className={formSection.general}>
        <Input
          handleChange={handleChange}
          id={SECTIONS.NAME}
          value={name}
          placeholder={`Nazwa urządzenia`}
          dataSection={SECTIONS.NAME}
        />
        <RichTextEditor
          handleChange={handleChange}
          id={SECTIONS.DESCRIPTION}
          value={description}
          dataSection={SECTIONS.DESCRIPTION}
        />
      </div>
    </Section>
  );
};

GeneralSection.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default GeneralSection;
