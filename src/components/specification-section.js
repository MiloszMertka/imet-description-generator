import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";

import formSectionStyles from "../styles/form-section.module.scss";

import controlsStyles from "../styles/controls.module.scss"; // used to target handle for rect-sortable

import { SECTIONS, KEYS, ACTION_TYPES, SORTABLE_GROUPS } from "../constants";

import Section from "./section";
import Input from "./input";
import Button from "./button";
import Controls from "./controls";
import Select from "./select";

const SpecificationSection = ({
  data,
  handleChange,
  handleButtonClick,
  handleCrossClick,
  handleReorder,
  templatesNames,
  currentTemplate,
  handleSelectChange,
}) => {
  const rows = data.map((item) => (
    <div key={item.id} className={formSectionStyles.inputRow}>
      <Controls
        handleCrossClick={() =>
          handleCrossClick(SECTIONS.SPECIFICATION, item.id)
        }
      />
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

  const selectOptions = useMemo(
    () =>
      templatesNames.map((templateName) => ({
        name: templateName,
        value: templateName,
      })),
    [templatesNames]
  );

  return (
    <Section title={`Dane techniczne`}>
      <div className={formSectionStyles.general}>
        <Select
          id={`templates`}
          value={currentTemplate}
          handleChange={handleSelectChange}
          options={selectOptions}
        />
      </div>
      <ReactSortable
        list={data}
        setList={(newState) => handleReorder(SECTIONS.SPECIFICATION, newState)}
        handle={`.${controlsStyles.draggable}`}
        group={SORTABLE_GROUPS.LABEL_VALUE_ROWS}
      >
        {rows}
      </ReactSortable>
      <Button
        handleClick={() =>
          handleButtonClick(ACTION_TYPES.ADD_ROW, SECTIONS.SPECIFICATION)
        }
        className={formSectionStyles.button}
      >
        Nowe pole
      </Button>
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
  handleCrossClick: PropTypes.func.isRequired,
  handleReorder: PropTypes.func.isRequired,
  templatesNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentTemplate: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
};

export default SpecificationSection;
