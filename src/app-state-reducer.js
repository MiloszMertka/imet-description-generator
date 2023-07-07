import { v4 as uuidv4 } from "uuid";
import { ACTION_TYPES, KEYS, SECTIONS } from "./constants";

export const initialState = {
  [SECTIONS.NAME]: "",
  [SECTIONS.DESCRIPTION]: "",
  [SECTIONS.SPECIFICATION]: [
    {
      id: uuidv4(),
      [KEYS.LABEL]: "",
      [KEYS.VALUE]: "",
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "Kod producenta",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "Wyposażenie",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "Opakowanie",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "Producent",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
    {
      id: uuidv4(),
      [KEYS.LABEL]: "EAN",
      [KEYS.VALUE]: "",
      isInitial: true,
    },
  ],
  [SECTIONS.GUARANTEE]: "",
  [SECTIONS.SET]: [
    { id: uuidv4(), [KEYS.VALUE]: "" },
    { id: uuidv4(), [KEYS.VALUE]: "Karta gwarancyjna", isInitial: true },
  ],
  [SECTIONS.ADDITIONAL_INFO]: [{ id: uuidv4(), [KEYS.VALUE]: "" }],
  [SECTIONS.ATTACHMENT]: "",
  [SECTIONS.ADDITIONAL_SECTIONS]: [
    {
      id: uuidv4(),
      [KEYS.TITLE]: "Nazwa sekcji",
      [KEYS.ROWS]: [
        {
          id: uuidv4(),
          [KEYS.LABEL]: "",
          [KEYS.VALUE]: "",
        },
      ],
    },
    {
      id: uuidv4(),
      [KEYS.TITLE]: "Nagłówek",
      [KEYS.DESCRIPTION]: "",
    },
  ],
};

export const init = (initialState) => initialState;

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_PROP:
      return { ...state, [action.section]: action.value };
    case ACTION_TYPES.CHANGE_VALUE:
      const section = state[action.section];
      if (action.section === SECTIONS.ADDITIONAL_SECTIONS && [KEYS.LABEL, KEYS.VALUE].includes(action.key)) {
        section.forEach((element) => {
          if (element.hasOwnProperty(KEYS.ROWS)) {
            element[KEYS.ROWS].forEach((row) => {
              if (row.id === action.uuid.replace(/_[A-Z0-9]*$/i, "")) {
                return (row[action.key] = action.value);
              }
            });
          }
        });
      } else {
        section.forEach((element) => {
          if (element.id === action.uuid.replace(/_[A-Z0-9]*$/i, "")) {
            return (element[action.key] = action.value);
          }
        });
      }
      return {
        ...state,
        section,
      };
    case ACTION_TYPES.ADD_ROW:
      if (action.section === SECTIONS.ADDITIONAL_SECTIONS) {
        const section = state[action.section];
        return {
          ...state,
          [action.section]: section.map((element) =>
            element.id === action.uuid
              ? {
                  ...element,
                  [KEYS.ROWS]: element[KEYS.ROWS].concat({
                    id: uuidv4(),
                    [KEYS.LABEL]: "",
                    [KEYS.VALUE]: "",
                  }),
                }
              : element
          ),
        };
      }

      const filteredSection = state[action.section].filter((row) => !row.isInitial);
      const initials = state[action.section].filter((row) => row.isInitial);

      return {
        ...state,
        [action.section]: filteredSection.concat(
          {
            id: uuidv4(),
            [KEYS.LABEL]: "",
            [KEYS.VALUE]: "",
          },
          initials
        ),
      };
    case ACTION_TYPES.ADD_INPUT:
      const filteredInputs = state[action.section].filter((input) => !input.isInitial);
      const initialInputs = state[action.section].filter((input) => input.isInitial);

      return {
        ...state,
        [action.section]: filteredInputs.concat(
          {
            id: uuidv4(),
            [KEYS.VALUE]: "",
          },
          initialInputs
        ),
      };
    case ACTION_TYPES.DELETE_ROW:
      if (action.innerRow) {
        const section = state[action.section];
        return {
          ...state,
          [action.section]: section.map((element) =>
            element.hasOwnProperty(KEYS.ROWS)
              ? {
                  ...element,
                  [KEYS.ROWS]: element[KEYS.ROWS].filter((row) => row.id !== action.uuid),
                }
              : element
          ),
        };
      }
      return {
        ...state,
        [action.section]: state[action.section].filter((element) => element.id !== action.uuid),
      };
    case ACTION_TYPES.REORDER_ROWS:
      if (action.innerRow) {
        const section = state[action.section];
        return {
          ...state,
          [action.section]: section.map((element) =>
            element.hasOwnProperty(KEYS.ROWS) && element.id === action.uuid ? { ...element, [KEYS.ROWS]: action.newState } : element
          ),
        };
      }
      return {
        ...state,
        [action.section]: action.newState,
      };
    case ACTION_TYPES.ADD_SECTION:
      return {
        ...state,
        [SECTIONS.ADDITIONAL_SECTIONS]: state[SECTIONS.ADDITIONAL_SECTIONS].concat({
          id: uuidv4(),
          [KEYS.TITLE]: "Nazwa sekcji",
          [KEYS.ROWS]: [
            {
              id: uuidv4(),
              [KEYS.LABEL]: "",
              [KEYS.VALUE]: "",
            },
          ],
        }),
      };
    case ACTION_TYPES.ADD_DESCRIPTION:
      return {
        ...state,
        [SECTIONS.ADDITIONAL_SECTIONS]: state[SECTIONS.ADDITIONAL_SECTIONS].concat({
          id: uuidv4(),
          [KEYS.TITLE]: "Nagłówek",
          [KEYS.DESCRIPTION]: "",
        }),
      };
    case ACTION_TYPES.LOAD_TEMPLATE:
      const selectedTemplate = action.templates.find((template) => template.name === action.value);

      const templateRows = selectedTemplate.attributes.map((attribute) => ({
        id: uuidv4(),
        [KEYS.LABEL]: attribute,
        [KEYS.VALUE]: "",
        template: true,
      }));

      return {
        ...state,
        [SECTIONS.SPECIFICATION]: [...templateRows, ...state[SECTIONS.SPECIFICATION].filter((row) => !row.template)],
      };
    default:
      throw new Error("Invalid action type");
  }
};
