import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/template-form.module.scss";
import { v4 as uuidv4 } from "uuid";
import { ReactSortable } from "react-sortablejs";
import { useToasts } from "react-toast-notifications";
import { getDataFromAPI, postDataToAPI } from "../utils";
import { SORTABLE_GROUPS } from "../constants";

import formSectionStyles from "../styles/form-section.module.scss";
import controlsStyles from "../styles/controls.module.scss";

import Section from "./section";
import Input from "./input";
import Select from "./select";
import Controls from "./controls";
import Button from "./button";

const TemplateForm = ({ isAuthenticated, token }) => {
  const { addToast } = useToasts();

  const [currentTemplate, setCurrentTemplate] = useState("Nowy szablon");

  const [templateName, setTemplateName] = useState("Nowy szablon");

  const [templates, setTemplates] = useState([
    {
      id: "newTemplate",
      name: "Nowy szablon",
      nameTemplate: "",
      characteristicsTemplate: "",
      attributes: [""],
    },
  ]);

  const [nameTemplate, setNameTemplate] = useState("");
  const [characteristicsTemplate, setCharacteristicsTemplate] = useState("");
  const [attributes, setAttributes] = useState([{ id: uuidv4(), value: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      const templates = await getDataFromAPI("/templates");
      if (templates) {
        const mappedTemplates = templates.map((template) => ({
          id: template.id,
          name: template.name,
          nameTemplate: template.name_template,
          characteristicsTemplate: template.characteristics_template,
          attributes: template.attributes,
        }));
        setTemplates((prevState) => [...prevState, ...mappedTemplates]);
      } else {
        addToast("Błąd pobierania szablonów", { appearance: "error" });
      }
    };
    fetchData();
  }, [addToast]);

  const handleTemplateNameChange = useCallback((event) => {
    setTemplateName(event.target.value);
  }, []);

  const handleTemplateSelectChange = useCallback(
    (event) => {
      setTemplateName(event.target.value);
      setCurrentTemplate(event.target.value);
      const template = templates.find(
        (template) => template.name === event.target.value
      );
      setNameTemplate(template.nameTemplate ?? "");
      setCharacteristicsTemplate(template.characteristicsTemplate ?? "");
      setAttributes(
        template.attributes.map((attribute) => ({
          id: uuidv4(),
          value: attribute,
        }))
      );
    },
    [templates]
  );

  const handleNameTemplateChange = useCallback((event) => {
    setNameTemplate(event.target.value);
  }, []);

  const handleCharacteristicsTemplateChange = useCallback((event) => {
    setCharacteristicsTemplate(event.target.value);
  }, []);

  const handleCrossClick = useCallback((id) => {
    setAttributes((prevState) =>
      prevState.filter((attribute) => attribute.id !== id)
    );
  }, []);

  const handleAttributeInputChange = useCallback((event) => {
    const target = event.target;
    setAttributes((prevState) =>
      prevState.map((attribute) =>
        attribute.id === target.id
          ? { id: attribute.id, value: target.value }
          : attribute
      )
    );
  }, []);

  const handleAddInputButtonClick = useCallback((event) => {
    event.preventDefault();
    setAttributes((prevState) => [...prevState, { id: uuidv4(), value: "" }]);
  }, []);

  const handleSubmitButtonClick = useCallback(
    (event) => {
      event.preventDefault();

      if (window.confirm("Czy na pewno chcesz zapisać zmiany?")) {
        const data = {
          currentTemplate,
          templateName,
          nameTemplate,
          characteristicsTemplate,
          attributes: attributes.map((attribute) => attribute.value),
        };

        const response = postDataToAPI("/templates", data, token);

        if (response) {
          addToast(`Pomyślnie zapisano zmiany`, { appearance: "success" });
        } else {
          addToast(`Błąd dodawania szablonu`, { appearance: "error" });
        }
      }
    },
    [
      currentTemplate,
      templateName,
      nameTemplate,
      characteristicsTemplate,
      attributes,
      token,
      addToast,
    ]
  );

  const selectOptions = useMemo(
    () =>
      templates.map((template) => ({
        name: template.name,
        value: template.name,
      })),
    [templates]
  );

  return (
    <Section className={styles.container} title={`Szablony`}>
      <div className={formSectionStyles.general}>
        <Input
          id={`name`}
          value={templateName}
          handleChange={handleTemplateNameChange}
          placeholder={`Nazwa szablonu`}
        />
        <Select
          id={`templates`}
          value={currentTemplate}
          handleChange={handleTemplateSelectChange}
          options={selectOptions}
        />
        <Input
          id={`nameTemplate`}
          value={nameTemplate}
          handleChange={handleNameTemplateChange}
          placeholder={`Szablon nazwy`}
        />
        <Input
          id={`characteristicsTemplate`}
          value={characteristicsTemplate}
          handleChange={handleCharacteristicsTemplateChange}
          placeholder={`Szablon charakterystyki`}
        />
      </div>
      <ReactSortable
        list={attributes}
        setList={setAttributes}
        handle={`.${controlsStyles.draggable}`}
        group={SORTABLE_GROUPS.VALUE_ROWS}
      >
        {attributes.map((attribute) => (
          <div
            key={attribute.id}
            className={`${formSectionStyles.inputRow} ${formSectionStyles.singleInput}`}
          >
            <Controls handleCrossClick={() => handleCrossClick(attribute.id)} />
            <Input
              handleChange={handleAttributeInputChange}
              id={attribute.id}
              value={attribute.value}
            />
          </div>
        ))}
      </ReactSortable>
      <Button
        className={formSectionStyles.button}
        handleClick={(event) => handleAddInputButtonClick(event)}
      >
        Nowe pole
      </Button>
      <Button
        className={`${formSectionStyles.button} ${styles.submit}`}
        handleClick={(event) => handleSubmitButtonClick(event)}
      >
        {currentTemplate === "Nowy szablon"
          ? "Utwórz szablon"
          : "Zatwierdź zmiany"}
      </Button>
    </Section>
  );
};

TemplateForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export default TemplateForm;
