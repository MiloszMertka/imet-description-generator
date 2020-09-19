import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/result.module.scss";

import { KEYS, SECTIONS } from "../constants";

import Section from "./section";

const Result = ({ data, outputRef }) => {
  return (
    <Section title={`Wygenerowany opis`}>
      <output ref={outputRef} className={styles.result}>
        <p>
          <b className="dsc-nazwa">{data[SECTIONS.NAME].trim()}</b>
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
                  __html: data[SECTIONS.DESCRIPTION]
                    .split("\n")
                    .join("<br />")
                    .trim(),
                }}
              ></td>
            </tr>
          </tbody>
        </table>
        <p></p>
        <p></p>
        {data[SECTIONS.SPECIFICATION].length > 0 && (
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
                {data[SECTIONS.SPECIFICATION].map((row) => {
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
                {data[SECTIONS.GUARANTEE] ? (
                  <tr>
                    <td className="desc-td2">Gwarancja:</td>
                    <td className="desc-td1">
                      <a
                        href={data[SECTIONS.GUARANTEE]}
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                      >
                        {data[SECTIONS.GUARANTEE]}
                      </a>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            <p></p>
          </>
        )}
        {data[SECTIONS.ADDITIONAL_INFO].length > 0 && (
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
                    <ul>
                      {data[SECTIONS.ADDITIONAL_INFO].map((row) => {
                        const value = row[KEYS.VALUE].trim();
                        return value && <li key={row.id}>{value}</li>;
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <p></p>
          </>
        )}
        {data[SECTIONS.SET].length > 0 && (
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
                    <ul>
                      {data[SECTIONS.SET].map((row) => {
                        const value = row[KEYS.VALUE].trim();
                        return value && <li key={row.id}>{value}</li>;
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <p></p>
          </>
        )}
        {data[SECTIONS.ADDITIONAL_SECTIONS].map((section) =>
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
        )}
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
