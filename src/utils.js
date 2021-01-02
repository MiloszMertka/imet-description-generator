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

export const postDataToAPI = async (
  request,
  data,
  token = "",
  method = "POST"
) => {
  const response = await fetch(`${API_REQUEST_URL}${request}`, {
    body: JSON.stringify(data),
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
