import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/textarea.module.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const RichTextEditor = ({ id, value, handleChange, dataSection, dataKey }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const changeEventData = {
      ...event,
      target: {
        value: data,
        id,
        dataset: {
          section: dataSection,
          key: dataKey,
        },
      },
    };
    handleChange(changeEventData);
  };

  return (
    <div className={styles.editor}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: ["bold", "italic", "link"],
        }}
        id={id}
        data={value}
        onChange={(event, editor) => handleEditorChange(event, editor)}
      />
    </div>
  );
};

RichTextEditor.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  dataSection: PropTypes.string,
  dataKey: PropTypes.string,
};

export default RichTextEditor;
