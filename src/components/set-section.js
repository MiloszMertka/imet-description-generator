import React from "react";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";

import formSectionStyles from "../styles/form-section.module.scss";

import controlsStyles from "../styles/controls.module.scss"; // used to target handle for rect-sortable

import { ACTION_TYPES, KEYS, SECTIONS, SORTABLE_GROUPS } from "../constants";

import Button from "./button";
import Section from "./section";
import Controls from "./controls";
import Input from "./input";

const SetSection = ({
  data,
  handleChange,
  handleButtonClick,
  handleCrossClick,
  handleReorder,
}) => {
  const rows = data.map((item) => (
    <div
      key={item.id}
      className={`${formSectionStyles.inputRow} ${formSectionStyles.singleInput}`}
    >
      <Controls
        handleCrossClick={() => handleCrossClick(SECTIONS.SET, item.id)}
      />
      <Input
        handleChange={(event) => handleChange(event)}
        id={item.id}
        value={item.value}
        dataSection={SECTIONS.SET}
        dataKey={KEYS.VALUE}
      />
    </div>
  ));

  return (
    <Section title={`Zawartość zestawu`}>
      <ReactSortable
        list={data}
        setList={(newState) => handleReorder(SECTIONS.SET, newState)}
        handle={`.${controlsStyles.draggable}`}
        group={SORTABLE_GROUPS.VALUE_ROWS}
      >
        {rows}
      </ReactSortable>
      <Button
        handleClick={() =>
          handleButtonClick(ACTION_TYPES.ADD_INPUT, SECTIONS.SET)
        }
        className={formSectionStyles.button}
      >
        Nowe pole
      </Button>
    </Section>
  );
};

SetSection.propTypes = {
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
};

export default SetSection;
