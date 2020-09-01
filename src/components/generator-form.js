import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/generator-form.module.scss";
import { ACTION_TYPES, KEYS, SECTIONS } from "../constants";

import GeneralSection from "./general-section";
import SpecificationSection from "./specification-section";
import SetSection from "./set-section";
import AdditionalInfoSection from "./additional-info-section";

const GeneratorForm = () => {
  const initialState = {
    [SECTIONS.NAME]: "",
    [SECTIONS.DESCRIPTION]: "",
    [SECTIONS.SPECIFICATION]: [
      {
        id: uuidv4(),
        [KEYS.LABEL]: "",
        [KEYS.VALUE]: "",
      },
      {
        id: uuidv4(),
        [KEYS.LABEL]: "Kod producenta",
        [KEYS.VALUE]: "",
      },
      {
        id: uuidv4(),
        [KEYS.LABEL]: "Wyposażenie",
        [KEYS.VALUE]: "",
      },
      {
        id: uuidv4(),
        [KEYS.LABEL]: "Opakowanie",
        [KEYS.VALUE]: "",
      },
      {
        id: uuidv4(),
        [KEYS.LABEL]: "Producent",
        [KEYS.VALUE]: "",
      },
      {
        id: uuidv4(),
        [KEYS.LABEL]: "EAN",
        [KEYS.VALUE]: "",
      },
      {
        id: uuidv4(),
        [KEYS.LABEL]: "Gwarancja",
        [KEYS.VALUE]: "",
      },
    ],
    [SECTIONS.SET]: [
      { id: uuidv4(), [KEYS.VALUE]: "" },
      { id: uuidv4(), [KEYS.VALUE]: "Karta gwarancyjna" },
      { id: uuidv4(), [KEYS.VALUE]: "Dowód zakupu" },
    ],
    [SECTIONS.ADDITIONAL_INFO]: [{ id: uuidv4(), [KEYS.VALUE]: "" }],
    [SECTIONS.ATTACHMENT]: "",
    [SECTIONS.ADDITIONAL_SECTIONS]: [
      {
        id: uuidv4(),
        [KEYS.TITLE]: "Nazwa sekcji",
        rows: [
          {
            id: uuidv4(),
            [KEYS.LABEL]: "",
            [KEYS.VALUE]: "",
          },
        ],
      },
    ],
    [SECTIONS.ADDITIONAL_DESCRIPTIONS]: [
      {
        id: uuidv4(),
        [KEYS.TITLE]: "Nagłówek",
        [KEYS.DESCRIPTION]: "",
      },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.CHANGE_PROP:
        return { ...state, [action.section]: action.value };
      case ACTION_TYPES.CHANGE_VALUE:
        const section = state[action.section];
        section.forEach((element) => {
          if (element.id === action.uuid.replace(/_[A-Z0-9]*$/i, "")) {
            element[action.key] = action.value;
          }
        });
        return {
          ...state,
          section,
        };
      case ACTION_TYPES.ADD_ROW:
        return {
          ...state,
          [action.section]: state[action.section].concat({
            id: uuidv4(),
            label: "",
            value: "",
          }),
        };
      case ACTION_TYPES.ADD_INPUT:
        return {
          ...state,
          [action.section]: state[action.section].concat({
            id: uuidv4(),
            value: "",
          }),
        };
      case ACTION_TYPES.DELETE_ROW:
        return {
          ...state,
          [action.section]: state[action.section].filter(
            (item) => item.id !== action.uuid
          ),
        };
      case ACTION_TYPES.REORDER_ROWS:
        return {
          ...state,
          [action.section]: action.newState,
        };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    const uuid = event.target.id;
    const section = event.target.dataset.section;

    if (
      [SECTIONS.NAME, SECTIONS.DESCRIPTION, SECTIONS.ATTACHMENT].includes(
        section
      )
    ) {
      return dispatch({ type: ACTION_TYPES.CHANGE_PROP, uuid, section });
    }

    const key = event.target.dataset.key;
    const value = event.target.value;
    dispatch({ type: ACTION_TYPES.CHANGE_VALUE, uuid, section, key, value });
  };

  const handleCrossClick = (section, uuid) => {
    dispatch({
      type: ACTION_TYPES.DELETE_ROW,
      section,
      uuid,
    });
  };

  const handleReorder = (section, newState) => {
    dispatch({
      type: ACTION_TYPES.REORDER_ROWS,
      section,
      newState,
    });
  };

  return (
    <form action="" className={styles.container}>
      <GeneralSection
        handleChange={handleChange}
        name={state[SECTIONS.NAME]}
        description={state[SECTIONS.DESCRIPTION]}
      />
      <SpecificationSection
        data={state[SECTIONS.SPECIFICATION]}
        handleChange={handleChange}
        handleButtonClick={() =>
          dispatch({
            type: ACTION_TYPES.ADD_ROW,
            section: SECTIONS.SPECIFICATION,
          })
        }
        handleCrossClick={handleCrossClick}
        handleReorder={handleReorder}
      />
      <SetSection
        data={state[SECTIONS.SET]}
        handleChange={handleChange}
        handleButtonClick={() =>
          dispatch({ type: ACTION_TYPES.ADD_INPUT, section: SECTIONS.SET })
        }
        handleCrossClick={handleCrossClick}
        handleReorder={handleReorder}
      />
      <AdditionalInfoSection
        handleReorder={handleReorder}
        handleCrossClick={handleCrossClick}
        handleChange={handleChange}
        handleButtonClick={() =>
          dispatch({
            type: ACTION_TYPES.ADD_INPUT,
            section: SECTIONS.ADDITIONAL_INFO,
          })
        }
        data={state[SECTIONS.ADDITIONAL_INFO]}
      />
    </form>
  );
};

export default GeneratorForm;
