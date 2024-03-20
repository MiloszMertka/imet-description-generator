import React from "react";
import PropTypes from "prop-types";

const SpecificationResult = ({
  specification,
  guarantee,
  manufacturer,
  model,
}) => {
  return (
    <>
      <p></p>
      <p></p>
      <table className="table-style1">
        <tbody>
          <tr>
            <th className="th-style1">
              Dane techniczne {manufacturer} {model}:
            </th>
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
  );
};

SpecificationResult.propTypes = {
  specification: PropTypes.element.isRequired,
  guarantee: PropTypes.element.isRequired,
  manufacturer: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export default SpecificationResult;
