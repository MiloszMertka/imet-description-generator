import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "../styles/result.module.scss";

import { KEYS, SECTIONS } from "../constants";

import Section from "./section";

const Result = ({ data, outputRef }) => {
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

  const specification = useMemo(
    () =>
      dataSpecification.map((row) => {
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
      }),
    [dataSpecification]
  );

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

  const additionalInfo = useMemo(
    () =>
      dataAdditionalInfo.map((row) => {
        const value = row[KEYS.VALUE].trim();
        return value && <li key={row.id}>{value}</li>;
      }),
    [dataAdditionalInfo]
  );

  const set = useMemo(
    () =>
      dataSet.map((row) => {
        const value = row[KEYS.VALUE].trim();
        return value && <li key={row.id}>{value}</li>;
      }),
    [dataSet]
  );

  const additionalSections = useMemo(
    () =>
      dataAdditionalSections.map((section) =>
        section.hasOwnProperty(KEYS.DESCRIPTION)
          ? section[KEYS.DESCRIPTION] &&
            section[KEYS.TITLE] && (
              <React.Fragment key={section.id}>
                <p></p>
                <p></p>
                <table className="table-style1">
                  <tbody>
                    <tr>
                      <th className="th-style1">
                        {section[KEYS.TITLE].trim()}
                      </th>
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
          : section[KEYS.ROWS].length > 0 &&
            section[KEYS.TITLE] && (
              <React.Fragment key={section.id}>
                <p></p>
                <p></p>
                <table className="table-style1">
                  <tbody>
                    <tr>
                      <th className="th-style1">
                        {section[KEYS.TITLE].trim()}
                      </th>
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
            )
      ),
    [dataAdditionalSections]
  );

  return (
    <Section title={`Wygenerowany opis`}>
      <output ref={outputRef} className={styles.result}>
        <p>
          <b className="dsc-nazwa">{name}</b>
        </p>
        <p></p>
        <p></p>
        <table className="table-style1">
          <tbody>
            <tr>
              <th className="th-style1">Charakterystyka:</th>
            </tr>
          </tbody>
        </table>
        <table className="table-style3">
          <tbody>
            <tr>
              <td
                className="desc-td3"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></td>
            </tr>
          </tbody>
        </table>
        <p></p>
        <p></p>
        {dataSpecification.length > 0 && (
          <>
            <table className="table-style1">
              <tbody>
                <tr>
                  <th className="th-style1">Dane techniczne:</th>
                </tr>
              </tbody>
            </table>
            <table className="table-style2">
              <tbody>
                {specification}
                {guarantee}
              </tbody>
            </table>
            <p></p>
          </>
        )}
        {dataAdditionalInfo.length > 0 && (
          <>
            <p></p>
            <p></p>
            <table className="table-style1">
              <tbody>
                <tr>
                  <th className="th-style1">Dodatkowe informacje:</th>
                </tr>
              </tbody>
            </table>
            <table className="table-style3">
              <tbody>
                <tr>
                  <td>
                    <ul>{additionalInfo}</ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <p></p>
          </>
        )}
        {dataSet.length > 0 && (
          <>
            <p></p>
            <p></p>
            <table className="table-style1">
              <tbody>
                <tr>
                  <th className="th-style1">Zawartość zestawu:</th>
                </tr>
              </tbody>
            </table>
            <table className="table-style3">
              <tbody>
                <tr>
                  <td>
                    <ul>{set}</ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <p></p>
          </>
        )}
        {additionalSections}
      </output>
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
