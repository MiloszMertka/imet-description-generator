const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY, OPENAI_ORGANIZATION, OPENAI_MODEL } = require("./constants");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

const generateDescription = async (productName, specification) => {
  try {
    const technicalData = specification.map(({ label, value }) => `${label}: ${value}`);

    const response = await openai.createChatCompletion({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Prowadzę hurtownię handlującą sprzętem z kategorii elektronarzędzi, narzędzi, artykułów ogrodowych, BHP. Chcę żebyś stworzył opis w profesjonalnym i poprawnym gramatycznie języku polskim dla produktu, który pojawi się w sprzedaży na moim sklepie internetowym. Jako dane przekażę ci nazwę produktu i parametry techniczne.",
        },
        {
          role: "system",
          content: "W odpowiedzi na moje zapytanie zamieść tylko sam opis produktu. Nie dołączaj żadnych dodatkowych informacji (nagłówki, stopka itp.).",
        },
        {
          role: "user",
          content: `Nazwa produktu: ${productName}`,
        },
        {
          role: "user",
          content: `Parametry techniczne:\n${technicalData.join("\n")}`,
        },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);

    return null;
  }
};

module.exports = {
  generateDescription,
};
