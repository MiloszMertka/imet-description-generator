import PropTypes from "prop-types";
import React from "react";

const CharacteristicsResult = ({ characteristics }) => {
  return (
    <>
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
                __html: characteristics,
              }}
            ></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

CharacteristicsResult.propTypes = {
  characteristics: PropTypes.string.isRequired,
};

export default CharacteristicsResult;
