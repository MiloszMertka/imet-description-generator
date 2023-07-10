export const ACTION_TYPES = {
  ADD_INPUT: "ADD_INPUT",
  ADD_ROW: "ADD_ROW",
  ADD_SECTION: "ADD_SECTION",
  ADD_DESCRIPTION: "ADD_DESCRIPTION",
  CHANGE_VALUE: "CHANGE_VALUE",
  CHANGE_ROW: "CHANGE_ROW",
  CHANGE_PROP: "CHANGE_PROP",
  DELETE_ROW: "DELETE_ROW",
  REORDER_ROWS: "REORDER_ROWS",
  LOAD_TEMPLATE: "LOAD_TEMPLATE",
};

export const SECTIONS = {
  NAME: "name",
  DESCRIPTION: "description",
  SPECIFICATION: "specification",
  SET: "set",
  ADDITIONAL_INFO: "additionalInfo",
  ATTACHMENT: "attachment",
  ADDITIONAL_SECTIONS: "additionalSections",
  GUARANTEE: "guarantee",
};

export const KEYS = {
  VALUE: "value",
  LABEL: "label",
  TITLE: "title",
  DESCRIPTION: "description",
  ROWS: "rows",
};

export const SORTABLE_GROUPS = {
  LABEL_VALUE_ROWS: "LABEL_VALUE_ROWS",
  VALUE_ROWS: "VALUE_ROWS",
};

/* for production use https://imet.pl/api and for development http://localhost:8000/api */
export const API_REQUEST_URL = "https://imet.pl/api";
