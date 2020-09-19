import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { SECTIONS } from "../constants";

import formSectionStyles from "../styles/form-section.module.scss";

import Section from "./section";
import Select from "./select";

const GuaranteeSection = ({
  currentGuarantee,
  handleSelectChange,
  guarantees,
}) => {
  const selectOptions = useMemo(
    () =>
      guarantees.map((guarantee) => ({
        name: guarantee.name,
        value: guarantee.link,
      })),
    [guarantees]
  );

  return (
    <Section title={`Gwarancja`}>
      <div className={formSectionStyles.general}>
        <Select
          id={`guarantee`}
          value={currentGuarantee}
          handleChange={handleSelectChange}
          options={selectOptions}
          dataSection={SECTIONS.GUARANTEE}
        />
      </div>
    </Section>
  );
};

GuaranteeSection.propTypes = {
  currentGuarantee: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  guarantees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default GuaranteeSection;
