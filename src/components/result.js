import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "../styles/result.module.scss";

import { KEYS, SECTIONS } from "../constants";

import Section from "./section";
import NameResult from "./name-result";
import CharacteristicsResult from "./characteristics-result";
import SpecificationResult from "./specification-result";
import AdditionalInfoResult from "./additional-info-result";
import SetResult from "./set-result";

const Result = ({
  data,
  subiektOutputRef,
  nsOutputRef,
  wholeDescriptionOutputRef,
}) => {
  const dataName = data[SECTIONS.NAME];
  const dataDescription = data[SECTIONS.DESCRIPTION];
  const dataSpecification = data[SECTIONS.SPECIFICATION];
  const dataGuarantee = data[SECTIONS.GUARANTEE];
  const dataAdditionalInfo = data[SECTIONS.ADDITIONAL_INFO];
  const dataSet = data[SECTIONS.SET];
  const dataAdditionalSections = data[SECTIONS.ADDITIONAL_SECTIONS];

  const name = useMemo(() => dataName.trim(), [dataName]);

  const description = useMemo(
    () => dataDescription.split("\n").join("<br />").trim(),
    [dataDescription]
  );

  const specification = dataSpecification.map((row) => {
    const label = row[KEYS.LABEL].trim();
    const value = row[KEYS.VALUE].trim();
    return label && value ? (
      <tr key={row.id}>
        <td className="desc-td2">
          {label.endsWith(":") ? label : `${label}:`}
        </td>
        <td className="desc-td1">{value}</td>
      </tr>
    ) : null;
  });

  const getManufacturer = () => {
    const manufacturer = dataSpecification.find(
      (row) => row[KEYS.LABEL].trim() === "Producent"
    );
    return manufacturer ? manufacturer[KEYS.VALUE].trim() : "";
  };

  const getModel = () => {
    const model = dataSpecification.find(
      (row) => row[KEYS.LABEL].trim() === "Kod producenta"
    );
    return model ? model[KEYS.VALUE].trim() : "";
  };

  const guarantee = useMemo(
    () =>
      dataGuarantee ? (
        <tr>
          <td className="desc-td2">Gwarancja:</td>
          <td className="desc-td1">
            <a
              href={dataGuarantee}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              {dataGuarantee}
            </a>
          </td>
        </tr>
      ) : null,
    [dataGuarantee]
  );

  const additionalInfo = dataAdditionalInfo.map((row) => {
    const value = row[KEYS.VALUE].trim();
    return (
      value && (
        <li key={row.id} dangerouslySetInnerHTML={{ __html: value }}></li>
      )
    );
  });

  const set = dataSet.map((row) => {
    const value = row[KEYS.VALUE].trim();
    return value && <li key={row.id}>{value}</li>;
  });

  const additionalSections = dataAdditionalSections.map((section) => {
    let isEmpty = false;
    if (section.hasOwnProperty(KEYS.ROWS)) {
      isEmpty = true;
      section[KEYS.ROWS].forEach((row) => {
        row[KEYS.LABEL].trim();
        row[KEYS.VALUE].trim();
        if (row[KEYS.LABEL] !== "" || row[KEYS.VALUE] !== "") {
          isEmpty = false;
        }
      });
    }

    if (isEmpty) {
      return "";
    }

    return section.hasOwnProperty(KEYS.DESCRIPTION)
      ? section[KEYS.DESCRIPTION] && section[KEYS.TITLE] && (
          <React.Fragment key={section.id}>
            <p></p>
            <p></p>
            <table className="table-style1">
              <tbody>
                <tr>
                  <th className="th-style1">{section[KEYS.TITLE].trim()}</th>
                </tr>
              </tbody>
            </table>
            <table className="table-style3">
              <tbody>
                <tr>
                  <td
                    className="desc-td3"
                    dangerouslySetInnerHTML={{
                      __html: section[KEYS.DESCRIPTION]
                        .split("\n")
                        .join("<br />")
                        .trim(),
                    }}
                  ></td>
                </tr>
              </tbody>
            </table>
            <p></p>
          </React.Fragment>
        )
      : section[KEYS.ROWS].length > 0 && section[KEYS.TITLE] && (
          <React.Fragment key={section.id}>
            <p></p>
            <p></p>
            <table className="table-style1">
              <tbody>
                <tr>
                  <th className="th-style1">{section[KEYS.TITLE].trim()}</th>
                </tr>
              </tbody>
            </table>
            <table className="table-style3">
              <tbody>
                <tr>
                  <td className="desc-td3"></td>
                </tr>
                {section[KEYS.ROWS].map((row) => {
                  const label = row[KEYS.LABEL].trim();
                  const value = row[KEYS.VALUE].trim();
                  return label && value ? (
                    <tr key={row.id}>
                      <td className="desc-td2">
                        {label.endsWith(":") ? label : `${label}:`}
                      </td>
                      <td className="desc-td1">{value}</td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
            <p></p>
          </React.Fragment>
        );
  });

  return (
    <Section title={`Wygenerowany opis`}>
      <div className={styles.container}>
        <div className={styles.result}>
          <h3 className={styles.heading}>Opis Subiekt</h3>
          <output ref={subiektOutputRef}>
            <NameResult name={name} />
            <CharacteristicsResult characteristics={description} />
            {dataSpecification.length > 0 && (
              <SpecificationResult
                specification={specification}
                guarantee={guarantee}
                model={getModel()}
                manufacturer={getManufacturer()}
              />
            )}
            {dataAdditionalInfo.length > 0 && (
              <AdditionalInfoResult
                additionalInfo={additionalInfo}
                model={getModel()}
                manufacturer={getManufacturer()}
              />
            )}
            {dataSet.length > 0 && <SetResult set={set} />}
          </output>
        </div>
        <div className={styles.result}>
          <h3 className={styles.heading}>Opis Narzędziownia</h3>
          <output ref={nsOutputRef}>
            <NameResult name={name} />
            {additionalSections}
            {dataSpecification.length > 0 && (
              <SpecificationResult
                specification={specification}
                guarantee={guarantee}
                model={getModel()}
                manufacturer={getManufacturer()}
              />
            )}
            {dataAdditionalInfo.length > 0 && (
              <AdditionalInfoResult
                additionalInfo={additionalInfo}
                model={getModel()}
                manufacturer={getManufacturer()}
              />
            )}
            {dataSet.length > 0 && <SetResult set={set} />}
          </output>
        </div>
        <div className={styles.hidden}>
          <output ref={wholeDescriptionOutputRef}>
            <NameResult name={name} />
            <CharacteristicsResult characteristics={description} />
            {dataSpecification.length > 0 && (
              <SpecificationResult
                specification={specification}
                guarantee={guarantee}
                model={getModel()}
                manufacturer={getManufacturer()}
              />
            )}
            {dataAdditionalInfo.length > 0 && (
              <AdditionalInfoResult
                additionalInfo={additionalInfo}
                model={getModel()}
                manufacturer={getManufacturer()}
              />
            )}
            {dataSet.length > 0 && <SetResult set={set} />}
            {additionalSections}
          </output>
        </div>
      </div>
    </Section>
  );
};

Result.propTypes = {
  data: PropTypes.shape({
    [SECTIONS.NAME]: PropTypes.string,
    [SECTIONS.DESCRIPTION]: PropTypes.string,
    [SECTIONS.SPECIFICATION]: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        [KEYS.LABEL]: PropTypes.string,
        [KEYS.VALUE]: PropTypes.string,
      })
    ),
    [SECTIONS.GUARANTEE]: PropTypes.string,
    [SECTIONS.SET]: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, [KEYS.VALUE]: PropTypes.string })
    ),
    [SECTIONS.ADDITIONAL_INFO]: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string, [KEYS.VALUE]: PropTypes.string })
    ),
    [SECTIONS.ATTACHMENT]: PropTypes.string,
    [SECTIONS.ADDITIONAL_SECTIONS]: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Result;
