import React from "react";
import PropTypes from "prop-types";

import { KEYS, SECTIONS } from "../constants";

import Section from "./section";

const Result = ({ data }) => {
  return (
    <Section title={`Wygenerowany opis`}>
      <div>
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
        <table className="table-style1">
          <tbody>
            <tr>
              <th className="th-style1">Dane techniczne:</th>
            </tr>
          </tbody>
        </table>
        <table className="table-style2">
          <tbody>
            {data[SECTIONS.SPECIFICATION].map((row) => (
              <tr key={row.id}>
                <td className="desc-td2">
                  {row[KEYS.LABEL].trim().endsWith(":")
                    ? row[KEYS.LABEL]
                    : `${row[KEYS.LABEL]}:`}
                </td>
                <td className="desc-td1">{row[KEYS.VALUE].trim()}</td>
              </tr>
            ))}
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
          </tbody>
        </table>
        <p></p>
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
                  {data[SECTIONS.ADDITIONAL_INFO].map((row) => (
                    <li key={row.id}>{row[KEYS.VALUE].trim()}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <p></p>
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
                  {data[SECTIONS.SET].map((row) => (
                    <li key={row.id}>{row[KEYS.VALUE].trim()}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <p></p>
        {data[SECTIONS.ADDITIONAL_SECTIONS].map((section) =>
          section.hasOwnProperty(KEYS.DESCRIPTION) ? (
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
          ) : (
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
                  {section[KEYS.ROWS].map((row) => (
                    <tr key={row.id}>
                      <td className="desc-td2">
                        {row[KEYS.LABEL].trim().endsWith(":")
                          ? row[KEYS.LABEL]
                          : `${row[KEYS.LABEL]}:`}
                      </td>
                      <td className="desc-td1">{row[KEYS.VALUE].trim()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p></p>
            </React.Fragment>
          )
        )}
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
