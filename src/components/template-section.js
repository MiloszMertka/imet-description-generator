import Select from "./select";
import React, { useMemo } from "react";
import Section from "./section";
import PropTypes from "prop-types";
import formSectionStyles from "../styles/form-section.module.scss";

const TemplateSection = ({ templatesNames, currentTemplate, handleChange }) => {
  const selectOptions = useMemo(
    () =>
      templatesNames.map((templateName) => ({
        name: templateName,
        value: templateName,
      })),
    [templatesNames]
  );

  return (
    <Section title={`Szablon`}>
      <div className={formSectionStyles.general}>
        <Select
          id={`templates`}
          value={currentTemplate}
          handleChange={handleChange}
          options={selectOptions}
        />
      </div>
    </Section>
  );
};

TemplateSection.propTypes = {
  templatesNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentTemplate: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TemplateSection;
