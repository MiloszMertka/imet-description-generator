import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useToasts } from "react-toast-notifications";
import { saveAs } from "file-saver";
import styles from "../styles/generator-form.module.scss";
import { ACTION_TYPES, SECTIONS } from "../constants";
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

const GeneratorForm = ({ state, dispatch }) => {
  const { addToast } = useToasts();

  const [templates, setTemplates] = useState([{ id: "defaultTemplate", name: "Szablon", attributes: [] }]);

  const [currentTemplate, setCurrentTemplate] = useState("Szablon");

  const [guarantees, setGuarantees] = useState([{ id: "defaultGuarantee", name: "Gwarancja", link: "" }]);

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

  const handleChange = useCallback(
    (event) => {
      const uuid = event.target.id;
      const section = event.target.dataset.section;
      const value = event.target.value;

      if ([SECTIONS.NAME, SECTIONS.DESCRIPTION, SECTIONS.ATTACHMENT, SECTIONS.GUARANTEE].includes(section)) {
        return dispatch({ type: ACTION_TYPES.CHANGE_PROP, section, value });
      }

      const key = event.target.dataset.key;
      dispatch({ type: ACTION_TYPES.CHANGE_VALUE, uuid, section, key, value });
    },
    [dispatch]
  );

  const handleAddInputButtonClick = useCallback(
    (actionType, section, uuid, event) => {
      event.preventDefault();
      dispatch({
        type: actionType,
        section,
        uuid,
      });
    },
    [dispatch]
  );

  const handleCrossClick = useCallback(
    (section, uuid, innerRow = false) => {
      dispatch({
        type: ACTION_TYPES.DELETE_ROW,
        section,
        uuid,
        innerRow,
      });
    },
    [dispatch]
  );

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
    [dispatch]
  );

  const handleAddSectionButton = useCallback(
    (event) => {
      event.preventDefault();
      dispatch({ type: ACTION_TYPES.ADD_SECTION });
    },
    [dispatch]
  );

  const handleAddDescriptionButton = useCallback(
    (event) => {
      event.preventDefault();
      dispatch({ type: ACTION_TYPES.ADD_DESCRIPTION });
    },
    [dispatch]
  );

  const handleTemplateSelectChange = useCallback(
    (event) => {
      const value = event.target.value;
      setCurrentTemplate(value);
      dispatch({ type: ACTION_TYPES.LOAD_TEMPLATE, value, templates });
    },
    [templates, dispatch]
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

  const templatesNames = useMemo(() => templates.map((template) => template.name), [templates]);

  return (
    <form action="" className={styles.container}>
      <GeneralSection handleChange={handleChange} name={state[SECTIONS.NAME]} description={state[SECTIONS.DESCRIPTION]} />
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
      <GuaranteeSection currentGuarantee={state[SECTIONS.GUARANTEE]} handleSelectChange={handleChange} guarantees={guarantees} />
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
        <Button handleClick={(event) => handleAddSectionButton(event)} className={formSectionStyles.specialButton}>
          Nowa sekcja
        </Button>
        <Button handleClick={(event) => handleAddDescriptionButton(event)} className={formSectionStyles.specialButton}>
          Nowy opis
        </Button>
      </section>
      <section className={`${formSectionStyles.buttonsSection} ${formSectionStyles.dottedBackground}`}>
        <Button className={formSectionStyles.specialButton} handleClick={handleResetButtonClick}>
          Reset
        </Button>
        <Button className={formSectionStyles.specialButton} handleClick={handleSaveButtonClick}>
          Zapisz
        </Button>
        <Button className={formSectionStyles.specialButton} handleClick={handleCopyButtonClick}>
          Kopiuj opis
        </Button>
      </section>
      <Result data={state} outputRef={outputRef} />
    </form>
  );
};

GeneratorForm.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default GeneratorForm;
