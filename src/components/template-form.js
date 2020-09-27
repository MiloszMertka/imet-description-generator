import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../styles/template-form.module.scss";
import { v4 as uuidv4 } from "uuid";
import { ReactSortable } from "react-sortablejs";
import { getDataFromAPI } from "../utils";
import { SORTABLE_GROUPS } from "../constants";

import formSectionStyles from "../styles/form-section.module.scss";
import controlsStyles from "../styles/controls.module.scss";

import Section from "./section";
import Input from "./input";
import Select from "./select";
import Controls from "./controls";
import Button from "./button";

const TemplateForm = () => {
  const [currentTemplate, setCurrentTemplate] = useState("Nowy szablon");

  const [templateName, setTemplateName] = useState("Nowy szablon");

  const [templates, setTemplates] = useState([
    {
      id: "newTemplate",
      name: "Nowy szablon",
      attributes: [""],
    },
  ]);

  const [attributes, setAttributes] = useState([{ id: uuidv4(), value: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      const templates = await getDataFromAPI("/templates");
      setTemplates((prevState) => [...prevState, ...templates]);
    };
    fetchData();
  }, []);

  const handleTemplateNameChange = useCallback((event) => {
    setTemplateName(event.target.value);
  }, []);

  const handleTemplateSelectChange = useCallback(
    (event) => {
      setTemplateName(event.target.value);
      setCurrentTemplate(event.target.value);
      let mappedAttributes = [];
      templates.forEach((template) => {
        if (template.name === event.target.value) {
          return (mappedAttributes = template.attributes);
        }
      });
      setAttributes(
        mappedAttributes.map((attribute) => ({
          id: uuidv4(),
          value: attribute,
        }))
      );
    },
    [templates]
  );

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

  const handleAddInputButtonClick = useCallback(() => {
    setAttributes((prevState) => [...prevState, { id: uuidv4(), value: "" }]);
  }, []);

  const handleSubmitButtonClick = useCallback(() => {
    const data = {
      currentTemplate,
      templateName,
      attributes,
    };
    //submit
  }, [currentTemplate, templateName, attributes]);

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
        />
        <Select
          id={`templates`}
          value={currentTemplate}
          handleChange={handleTemplateSelectChange}
          options={selectOptions}
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
        handleClick={handleAddInputButtonClick}
      >
        Nowe pole
      </Button>
      <Button
        className={`${formSectionStyles.button} ${styles.submit}`}
        handleClick={handleSubmitButtonClick}
      >
        {currentTemplate === "Nowy szablon"
          ? "Utwórz szablon"
          : "Zatwierdź zmiany"}
      </Button>
    </Section>
  );
};

export default TemplateForm;
