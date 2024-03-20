import PropTypes from "prop-types";
import React from "react";

const SetResult = ({ set }) => {
  return (
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
  );
};

SetResult.propTypes = {
  set: PropTypes.element.isRequired,
};

export default SetResult;
