import React from "react";
import PropTypes from "prop-types";

import TemplateForm from "./template-form";
import GuaranteeForm from "./guarantee-form";

const EditorForm = ({ isAuthenticated, token }) => {
  return (
    <>
      <TemplateForm isAuthenticated={isAuthenticated} token={token} />
      <GuaranteeForm isAuthenticated={isAuthenticated} token={token} />
    </>
  );
};

EditorForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

export default EditorForm;
