import React, {
  useEffect,
  useReducer,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useToasts } from "react-toast-notifications";
import { saveAs } from "file-saver";
import styles from "../styles/generator-form.module.scss";
import { ACTION_TYPES, KEYS, SECTIONS } from "../constants";
import { getDataFromAPI } from "../utils";

import formSectionStyles from "../styles/form-section.module.scss";

import GeneralSection from "./general-section";
import SpecificationSection from "./specification-section";
import GuaranteeSection from "./guarantee-section";
import SetSection from "./set-section";
import AdditionalInfoSection from "./additional-info-section";
import AdditionalSections from "./additional-sections";
import Button from "./button";
import Result from "./result";

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
      isInitial: true,
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "Wyposażenie",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "Opakowanie",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "Producent",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "EAN",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
  ],
  [SECTIONS.GUARANTEE]: "",
  [SECTIONS.SET]: [
    { id: uuidv4(), [KEYS.VALUE]: "" },
    { id: uuidv4(), [KEYS.VALUE]: "Karta gwarancyjna", isInitial: true },
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

const init = (initialState) => initialState;

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

      const filteredSection = state[action.section].filter(
        (row) => !row.isInitial
      );
      const initials = state[action.section].filter((row) => row.isInitial);

      return {
        ...state,
        [action.section]: filteredSection.concat(
          {
            id: uuidv4(),
            [KEYS.LABEL]: "",
            [KEYS.VALUE]: "",
          },
          initials
        ),
      };
    case ACTION_TYPES.ADD_INPUT:
      const filteredInputs = state[action.section].filter(
        (input) => !input.isInitial
      );
      const initialInputs = state[action.section].filter(
        (input) => input.isInitial
      );

      return {
        ...state,
        [action.section]: filteredInputs.concat(
          {
            id: uuidv4(),
            [KEYS.VALUE]: "",
          },
          initialInputs
        ),
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
            element.hasOwnProperty(KEYS.ROWS) && element.id === action.uuid
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
    case ACTION_TYPES.LOAD_TEMPLATE:
      const selectedTemplate = action.templates.find(
        (template) => template.name === action.value
      );

      const templateRows = selectedTemplate.attributes.map((attribute) => ({
        id: uuidv4(),
        [KEYS.LABEL]: attribute,
        [KEYS.VALUE]: "",
        template: true,
      }));

      return {
        ...state,
        [SECTIONS.SPECIFICATION]: [
          ...templateRows,
          ...state[SECTIONS.SPECIFICATION].filter((row) => !row.template),
        ],
      };
    default:
      throw new Error("Invalid action type");
  }
};

const GeneratorForm = () => {
  const { addToast } = useToasts();

  const [templates, setTemplates] = useState([
    { id: "defaultTemplate", name: "Szablon", attributes: [] },
  ]);

  const [currentTemplate, setCurrentTemplate] = useState("Szablon");

  const [guarantees, setGuarantees] = useState([
    { id: "defaultGuarantee", name: "Gwarancja", link: "" },
  ]);

  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    const fetchData = async () => {
      const templates = await getDataFromAPI("/templates");
      const guarantees = await getDataFromAPI("/guarantees");

      if (templates) {
        setTemplates((prevState) => [...prevState, ...templates]);
      } else {
        addToast("Błąd pobierania szablonów", { appearance: "error" });
      }

      if (guarantees) {
        setGuarantees((prevState) => [...prevState, ...guarantees]);
      } else {
        addToast("Błąd pobierania gwarancji", { appearance: "error" });
      }
    };
    fetchData();
  }, [addToast]);

  const handleChange = useCallback((event) => {
    const uuid = event.target.id;
    const section = event.target.dataset.section;
    const value = event.target.value;

    if (
      [
        SECTIONS.NAME,
        SECTIONS.DESCRIPTION,
        SECTIONS.ATTACHMENT,
        SECTIONS.GUARANTEE,
      ].includes(section)
    ) {
      return dispatch({ type: ACTION_TYPES.CHANGE_PROP, section, value });
    }

    const key = event.target.dataset.key;
    dispatch({ type: ACTION_TYPES.CHANGE_VALUE, uuid, section, key, value });
  }, []);

  const handleAddInputButtonClick = useCallback(
    (actionType, section, uuid, event) => {
      event.preventDefault();
      dispatch({
        type: actionType,
        section,
        uuid,
      });
    },
    []
  );

  const handleCrossClick = useCallback((section, uuid, innerRow = false) => {
    dispatch({
      type: ACTION_TYPES.DELETE_ROW,
      section,
      uuid,
      innerRow,
    });
  }, []);

  const handleReorder = useCallback(
    (section, newState, innerRow = false, uuid = null) => {
      dispatch({
        type: ACTION_TYPES.REORDER_ROWS,
        section,
        newState,
        innerRow,
        uuid,
      });
    },
    []
  );

  const handleAddSectionButton = useCallback((event) => {
    event.preventDefault();
    dispatch({ type: ACTION_TYPES.ADD_SECTION });
  }, []);

  const handleAddDescriptionButton = useCallback((event) => {
    event.preventDefault();
    dispatch({ type: ACTION_TYPES.ADD_DESCRIPTION });
  }, []);

  const handleTemplateSelectChange = useCallback(
    (event) => {
      const value = event.target.value;
      setCurrentTemplate(value);
      dispatch({ type: ACTION_TYPES.LOAD_TEMPLATE, value, templates });
    },
    [templates]
  );

  const handleResetButtonClick = useCallback((event) => {
    event.preventDefault();
    if (window.confirm("Czy na pewno chcesz zresetować formularz?")) {
      window.location.reload();
    }
  }, []);

  const outputRef = useRef(null);

  const handleCopyButtonClick = useCallback(
    (event) => {
      event.preventDefault();
      if (outputRef.current !== null) {
        window.getSelection().selectAllChildren(outputRef.current);
        document.execCommand("copy");
        addToast("Opis został skopiowany do schowka", { appearance: "info" });
      }
    },
    [addToast]
  );

  const handleSaveButtonClick = useCallback(
    (event) => {
      event.preventDefault();
      if (outputRef.current !== null) {
        const blob = new Blob([outputRef.current.innerHTML], {
          type: "text/html;charset=utf-8",
        });
        const filename = `${state[SECTIONS.NAME]}.html`;
        saveAs(blob, filename);
      }
    },
    [state]
  );

  const templatesNames = useMemo(
    () => templates.map((template) => template.name),
    [templates]
  );

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
        templatesNames={templatesNames}
        currentTemplate={currentTemplate}
        handleSelectChange={handleTemplateSelectChange}
      />
      <GuaranteeSection
        currentGuarantee={state[SECTIONS.GUARANTEE]}
        handleSelectChange={handleChange}
        guarantees={guarantees}
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
      <section className={formSectionStyles.buttonsSection}>
        <Button
          handleClick={(event) => handleAddSectionButton(event)}
          className={formSectionStyles.specialButton}
        >
          Nowa sekcja
        </Button>
        <Button
          handleClick={(event) => handleAddDescriptionButton(event)}
          className={formSectionStyles.specialButton}
        >
          Nowy opis
        </Button>
      </section>
      <section
        className={`${formSectionStyles.buttonsSection} ${formSectionStyles.dottedBackground}`}
      >
        <Button
          className={formSectionStyles.specialButton}
          handleClick={handleResetButtonClick}
        >
          Reset
        </Button>
        <Button
          className={formSectionStyles.specialButton}
          handleClick={handleSaveButtonClick}
        >
          Zapisz
        </Button>
        <Button
          className={formSectionStyles.specialButton}
          handleClick={handleCopyButtonClick}
        >
          Kopiuj opis
        </Button>
      </section>
      <Result data={state} outputRef={outputRef} />
    </form>
  );
};

export default GeneratorForm;
