import React from "react";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";

import controlsStyles from "../styles/controls.module.scss";

import { ACTION_TYPES, KEYS, SECTIONS } from "../constants";

import Button from "./button";
import Section from "./section";
import Controls from "./controls";
import Input from "./input";

const AdditionalInfoSection = ({
  data,
  handleChange,
  handleButtonClick,
  handleCrossClick,
  handleReorder,
}) => {
  const rows = data.map((item) => (
    <div key={item.id}>
      <Controls
        handleCrossClick={() =>
          handleCrossClick(SECTIONS.ADDITIONAL_INFO, item.id)
        }
      />
      <Input
        handleChange={(event) => handleChange(event)}
        id={item.id}
        value={item.value}
        dataSection={SECTIONS.ADDITIONAL_INFO}
        dataKey={KEYS.VALUE}
      />
    </div>
  ));

  return (
    <Section title={`Dodatkowe informacje`}>
      <ReactSortable
        list={data}
        setList={(newState) =>
          handleReorder(SECTIONS.ADDITIONAL_INFO, newState)
        }
        handle={`.${controlsStyles.draggable}`}
      >
        {rows}
      </ReactSortable>
      <Button
        handleClick={() =>
          handleButtonClick(ACTION_TYPES.ADD_INPUT, SECTIONS.ADDITIONAL_INFO)
        }
      >
        Nowe pole
      </Button>
    </Section>
  );
};

AdditionalInfoSection.propTypes = {
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

export default AdditionalInfoSection;
