import { GenerationConfig, GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "Role: you are Feature extractor from text, you will be given text, if text has a remedy or decription of a medicenes which should be take for some given symptoms, you have to extract symptoms, remides, medicnes and health advice or suggestions",
});

const generationConfig:GenerationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object" as SchemaType,
    properties: {
      symptoms: {
        type: "array" as SchemaType,
        items: {
          type: "string" as SchemaType,
        },
      },
      remedies: {
        type: "array" as SchemaType,
        items: {
          type: "string" as SchemaType,
        },
      },
      healthSuggestions: {
        type: "array" as SchemaType,
        items: {
          type: "string" as SchemaType,
        },
      },
      medicines: {
        type: "array" as SchemaType,
        items: {
          type: "string" as SchemaType,
        },
      },
      diseases: {
        type: "array" as SchemaType,
        items: {
          type: "string" as SchemaType,
        },
      },
    },
    required: ["symptoms"],
  },
};

const run = async (input:string):Promise<void> => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(input);
  return JSON.parse(result.response.text());
};

export default run;