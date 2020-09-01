import React from "react";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";

import controlsStyles from "../styles/controls.module.scss";

import { KEYS, SECTIONS } from "../constants";

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
    <div key={item.id}>
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
      >
        {rows}
      </ReactSortable>
      <Button handleClick={handleButtonClick}>Nowe pole</Button>
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
