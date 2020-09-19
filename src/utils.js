import { API_REQUEST_URL } from "./constants";

export const getDataFromAPI = async (request) => {
  try {
    const response = await fetch(`${API_REQUEST_URL}${request}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
