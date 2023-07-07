import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY, OPENAI_ORGANIZATION, OPENAI_MODEL } from "./constants";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

export const generateDescription = async (productName, specification) => {
  return await openai.createChatCompletion({
    model: OPENAI_MODEL,
    messages: [],
  });
};
