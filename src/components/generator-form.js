import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/generator-form.module.scss";
import { ACTION_TYPES, KEYS, SECTIONS } from "../constants";

import GeneralSection from "./general-section";
import SpecificationSection from "./specification-section";
import SetSection from "./set-section";
import AdditionalInfoSection from "./additional-info-section";
import AdditionalSections from "./additional-sections";
import Button from "./button";

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
        [KEYS.ROWS]: [
          {
            id: uuidv4(),
            [KEYS.LABEL]: "",
            [KEYS.VALUE]: "",
          },
        ],
      },
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
        if (
          action.section === SECTIONS.ADDITIONAL_SECTIONS &&
          [KEYS.LABEL, KEYS.VALUE].includes(action.key)
        ) {
          section.forEach((element) => {
            if (element.hasOwnProperty(KEYS.ROWS)) {
              element[KEYS.ROWS].forEach((row) => {
                if (row.id === action.uuid.replace(/_[A-Z0-9]*$/i, "")) {
                  return (row[action.key] = action.value);
                }
              });
            }
          });
        } else {
          section.forEach((element) => {
            if (element.id === action.uuid.replace(/_[A-Z0-9]*$/i, "")) {
              return (element[action.key] = action.value);
            }
          });
        }
        return {
          ...state,
          section,
        };
      case ACTION_TYPES.ADD_ROW:
        if (action.section === SECTIONS.ADDITIONAL_SECTIONS) {
          const section = state[action.section];
          return {
            ...state,
            [action.section]: section.map((element) =>
              element.id === action.uuid
                ? {
                    ...element,
                    [KEYS.ROWS]: element[KEYS.ROWS].concat({
                      id: uuidv4(),
                      [KEYS.LABEL]: "",
                      [KEYS.VALUE]: "",
                    }),
                  }
                : element
            ),
          };
        }
        return {
          ...state,
          [action.section]: state[action.section].concat({
            id: uuidv4(),
            [KEYS.LABEL]: "",
            [KEYS.VALUE]: "",
          }),
        };
      case ACTION_TYPES.ADD_INPUT:
        return {
          ...state,
          [action.section]: state[action.section].concat({
            id: uuidv4(),
            [KEYS.VALUE]: "",
          }),
        };
      case ACTION_TYPES.DELETE_ROW:
        if (action.innerRow) {
          const section = state[action.section];
          return {
            ...state,
            [action.section]: section.map((element) =>
              element.hasOwnProperty(KEYS.ROWS)
                ? {
                    ...element,
                    [KEYS.ROWS]: element[KEYS.ROWS].filter(
                      (row) => row.id !== action.uuid
                    ),
                  }
                : element
            ),
          };
        }
        return {
          ...state,
          [action.section]: state[action.section].filter(
            (element) => element.id !== action.uuid
          ),
        };
      case ACTION_TYPES.REORDER_ROWS:
        if (action.innerRow) {
          const section = state[action.section];
          return {
            ...state,
            [action.section]: section.map((element) =>
              element.hasOwnProperty(KEYS.ROWS)
                ? { ...element, [KEYS.ROWS]: action.newState }
                : element
            ),
          };
        }
        return {
          ...state,
          [action.section]: action.newState,
        };
      case ACTION_TYPES.ADD_SECTION:
        return {
          ...state,
          [SECTIONS.ADDITIONAL_SECTIONS]: state[
            SECTIONS.ADDITIONAL_SECTIONS
          ].concat({
            id: uuidv4(),
            [KEYS.TITLE]: "Nazwa sekcji",
            [KEYS.ROWS]: [
              {
                id: uuidv4(),
                [KEYS.LABEL]: "",
                [KEYS.VALUE]: "",
              },
            ],
          }),
        };
      case ACTION_TYPES.ADD_DESCRIPTION:
        return {
          ...state,
          [SECTIONS.ADDITIONAL_SECTIONS]: state[
            SECTIONS.ADDITIONAL_SECTIONS
          ].concat({
            id: uuidv4(),
            [KEYS.TITLE]: "Nagłówek",
            [KEYS.DESCRIPTION]: "",
          }),
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

  const handleAddInputButtonClick = (actionType, section, uuid) => {
    dispatch({
      type: actionType,
      section,
      uuid,
    });
  };

  const handleCrossClick = (section, uuid, innerRow = false) => {
    dispatch({
      type: ACTION_TYPES.DELETE_ROW,
      section,
      uuid,
      innerRow,
    });
  };

  const handleReorder = (section, newState, innerRow = false, uuid = null) => {
    dispatch({
      type: ACTION_TYPES.REORDER_ROWS,
      section,
      newState,
      innerRow,
      uuid,
    });
  };

  const handleAddSectionButton = () => {
    dispatch({ type: ACTION_TYPES.ADD_SECTION });
  };

  const handleAddDescriptionButton = () => {
    dispatch({ type: ACTION_TYPES.ADD_DESCRIPTION });
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
        handleButtonClick={handleAddInputButtonClick}
        handleCrossClick={handleCrossClick}
        handleReorder={handleReorder}
      />
      <SetSection
        data={state[SECTIONS.SET]}
        handleChange={handleChange}
        handleButtonClick={handleAddInputButtonClick}
        handleCrossClick={handleCrossClick}
        handleReorder={handleReorder}
      />
      <AdditionalInfoSection
        handleReorder={handleReorder}
        handleCrossClick={handleCrossClick}
        handleChange={handleChange}
        handleButtonClick={handleAddInputButtonClick}
        data={state[SECTIONS.ADDITIONAL_INFO]}
      />
      <AdditionalSections
        handleReorder={handleReorder}
        handleCrossClick={handleCrossClick}
        handleChange={handleChange}
        handleButtonClick={handleAddInputButtonClick}
        data={state[SECTIONS.ADDITIONAL_SECTIONS]}
      />
      <section>
        <Button handleClick={handleAddSectionButton}>Nowa sekcja</Button>
        <Button handleClick={handleAddDescriptionButton}>Nowy opis</Button>
      </section>
    </form>
  );
};

export default GeneratorForm;
