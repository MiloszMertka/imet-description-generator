import PropTypes from "prop-types";
import React from "react";

const AdditionalInfoResult = ({ additionalInfo, manufacturer, model }) => {
  console.log(additionalInfo);
  return (
    <>
      <p></p>
      <p></p>
      <table className="table-style1">
        <tbody>
          <tr>
            <th className="th-style1">
              Cechy produktu {manufacturer} {model}:
            </th>
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
  );
};

AdditionalInfoResult.propTypes = {
  additionalInfo: PropTypes.element.isRequired,
  manufacturer: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export default AdditionalInfoResult;
