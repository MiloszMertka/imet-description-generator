import React from "react";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";

import formSectionStyles from "../styles/form-section.module.scss";

import controlsStyles from "../styles/controls.module.scss"; // used to target handle for rect-sortable

import { ACTION_TYPES, KEYS, SECTIONS } from "../constants";

import Button from "./button";
import Section from "./section";
import Controls from "./controls";
import Input from "./input";
import Textarea from "./textarea";

const AdditionalSections = ({
  data,
  handleChange,
  handleButtonClick,
  handleCrossClick,
  handleReorder,
}) => {
  const sections = data.map((section) => (
    <Section key={section.id} title={section[KEYS.TITLE]}>
      <div
        className={`${formSectionStyles.general} ${formSectionStyles.titleInput}`}
      >
        <Controls
          handleCrossClick={() =>
            handleCrossClick(SECTIONS.ADDITIONAL_SECTIONS, section.id)
          }
        />
        <Input
          id={section.id}
          value={section[KEYS.TITLE]}
          handleChange={(event) => handleChange(event)}
          dataSection={SECTIONS.ADDITIONAL_SECTIONS}
          dataKey={KEYS.TITLE}
        />
      </div>
      {section.hasOwnProperty(KEYS.ROWS) ? (
        <ReactSortable
          list={section[KEYS.ROWS]}
          setList={(newState) =>
            handleReorder(
              SECTIONS.ADDITIONAL_SECTIONS,
              newState,
              true,
              section.id
            )
          }
          handle={`.${controlsStyles.draggable}`}
        >
          {section[KEYS.ROWS].map((row) => (
            <div key={row.id} className={formSectionStyles.inputRow}>
              <Controls
                handleCrossClick={() =>
                  handleCrossClick(SECTIONS.ADDITIONAL_SECTIONS, row.id, true)
                }
              />
              <Input
                id={`${row.id}_label`}
                value={row[KEYS.LABEL]}
                handleChange={(event) => handleChange(event)}
                dataSection={SECTIONS.ADDITIONAL_SECTIONS}
                dataKey={KEYS.LABEL}
              />
              <Input
                id={`${row.id}_value`}
                value={row[KEYS.VALUE]}
                handleChange={(event) => handleChange(event)}
                dataSection={SECTIONS.ADDITIONAL_SECTIONS}
                dataKey={KEYS.VALUE}
              />
            </div>
          ))}
        </ReactSortable>
      ) : (
        <div className={formSectionStyles.general}>
          <Textarea
            handleChange={(event) => handleChange(event)}
            value={section[KEYS.DESCRIPTION]}
            id={`${section.id}_description`}
            dataSection={SECTIONS.ADDITIONAL_SECTIONS}
            dataKey={KEYS.DESCRIPTION}
          />
        </div>
      )}
      {section.hasOwnProperty(KEYS.ROWS) && (
        <Button
          handleClick={() =>
            handleButtonClick(
              ACTION_TYPES.ADD_ROW,
              SECTIONS.ADDITIONAL_SECTIONS,
              section.id
            )
          }
          className={formSectionStyles.button}
        >
          Nowe pole
        </Button>
      )}
    </Section>
  ));

  return (
    <ReactSortable
      list={data}
      setList={(newState) =>
        handleReorder(SECTIONS.ADDITIONAL_SECTIONS, newState)
      }
      handle={`.${controlsStyles.draggable}`}
    >
      {sections}
    </ReactSortable>
  );
};

AdditionalSections.propTypes = {
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

export default AdditionalSections;
