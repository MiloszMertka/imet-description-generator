import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../styles/guarantee-form.module.scss";
import { getDataFromAPI } from "../utils";

import formSectionStyles from "../styles/form-section.module.scss";

import Section from "./section";
import Select from "./select";
import Input from "./input";
import Button from "./button";

const GuaranteeForm = () => {
  const [guarantees, setGuarantees] = useState([
    { id: "newGuarantee", name: "Nowa gwarancja", link: "" },
  ]);

  const [currentGuarantee, setCurrentGuarantee] = useState("Nowa gwarancja");

  const [guarantee, setGuarantee] = useState({ name: "", link: "" });

  useEffect(() => {
    const fetchData = async () => {
      const guarantees = await getDataFromAPI("/guarantees");
      setGuarantees((prevState) => [...prevState, ...guarantees]);
    };
    fetchData();
  }, []);

  const handleGuaranteeSelectChange = useCallback(
    (event) => {
      setCurrentGuarantee(event.target.value);
      let selectedGuarantee = {};
      guarantees.forEach((guarantee) => {
        if (guarantee.name === event.target.value) {
          return (selectedGuarantee = guarantee);
        }
      });
      setGuarantee(selectedGuarantee);
    },
    [guarantees]
  );

  const handleInputChange = useCallback((event) => {
    const target = event.target;
    if (target.id === "guarantee_name") {
      setGuarantee((prevState) => ({ ...prevState, name: target.value }));
    } else {
      setGuarantee((prevState) => ({ ...prevState, link: target.value }));
    }
  }, []);

  const handleSubmitButtonClick = useCallback(() => {
    const data = {
      currentGuarantee,
      guarantee,
    };
    // submit
  }, [currentGuarantee, guarantee]);

  const selectOptions = useMemo(
    () =>
      guarantees.map((guarantee) => ({
        name: guarantee.name,
        value: guarantee.name,
      })),
    [guarantees]
  );

  return (
    <Section className={styles.container} title={`Gwarancje`}>
      <Select
        id={`guarantees`}
        value={currentGuarantee}
        handleChange={handleGuaranteeSelectChange}
        options={selectOptions}
      />
      <div className={styles.inputs}>
        <Input
          id={`guarantee_name`}
          value={guarantee.name}
          handleChange={handleInputChange}
          placeholder={`Nazwa`}
        />
        <Input
          id={`guarantee_link`}
          value={guarantee.link}
          handleChange={handleInputChange}
          placeholder={`Link do gwarancji`}
        />
      </div>
      <Button
        className={formSectionStyles.button}
        handleClick={handleSubmitButtonClick}
      >
        {currentGuarantee === "Nowa gwarancja"
          ? "Utwórz gwarancję"
          : "Zatwierdź zmiany"}
      </Button>
    </Section>
  );
};

export default GuaranteeForm;
