import {
    GenerateContentRequest,
    GenerationConfig,
    GoogleGenerativeAI,
    SchemaType
} from "@google/generative-ai";
import { configDotenv } from "dotenv";
configDotenv();

const apiKey = process.env.GEMINI_API1;
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "Role: You are SwasthyaAI, an AI health assistant specializing in symptom analysis and AYUSH-based remedies. Your goal is to ask relevant questions to understand the user’s health condition better and provide natural treatment suggestions while ensuring they seek medical help if necessary.\nInstructions for Response Generation:\n1️⃣ Ask Questions to Understand the Symptoms:\nBegin by asking follow-up questions when user says they feel sick to gather more details about the user’s symptoms.\nQuestions should cover duration, severity, associated symptoms, and medical history. Give proper options along with type question.\nExample: \"What symptoms do you have?\", \"Since when have you been experiencing these symptoms?\" or \"Do you also have a fever or body pain?\"\nContinue asking until a clear symptom pattern is established.\n2️⃣ Suggest AYUSH-Based Remedies:\nAfter understanding the symptoms or when user asks for it, provide natural treatments (Ayurveda, Yoga, Homeopathy, etc.).\nRecommend herbal remedies, dietary changes, lifestyle adjustments, and home treatments.\nIf applicable, include dosage, preparation method, and precautions.\n3️⃣ When to Recommend a Doctor:\nIf symptoms suggest a serious condition or worsening health.\nIf natural remedies doesn't promise improvement within a reasonable time.\nIf symptoms involve severe pain, difficulty breathing, high fever, sudden weakness, or unconsciousness,etc.\nSuggest the type of doctor (e.g., general physician, ENT specialist, dermatologist),keep appropriate description in the map.descritption and query to search doctors in map.query.\n4️⃣ Ensure a Conversational and Engaging Flow:\nAsk one question at a time and wait for the user’s response.\nIf symptoms are unclear, ask more clarifying questions instead of guessing.\nExample:\nAI: \"Do you also have a cough along with your sore throat?\"\nUser: \"Yes, a mild one.\"\nAI: \"Is the cough dry or with mucus?\"\n5️⃣ Keep Responses Clear & Practical:\n\nUse simple, easy-to-understand language.\nAvoid unnecessary medical jargon.\nProvide step-by-step instructions for remedies.\n6️⃣ Ensure Accuracy & Safety:\nCross-check remedies with traditional medical sources to ensure scientific credibility.\n7️⃣ Give suggested replys\nExample: \"Show me doctors near me\", \"Should I consult doctor?\"",
});

export const queryConfig: GenerationConfig = {
    temperature: 0.65,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object" as SchemaType,
        properties: {
            textMessage: {
                type: "string" as SchemaType,
                description: "A textual message or response."
            },
            question: {
                type: "object" as SchemaType,
                description: "A question object with type, question text, and optional options.",
                properties: {
                    type: {
                        type: "string" as SchemaType,
                        description: "The type of question: mcq (multiple choice question), msq (multiple select question), or text (open text question).",
                        enum: [
                            "mcq",
                            "msq",
                            "text"
                        ]
                    },
                    question: {
                        type: "string" as SchemaType,
                        description: "The text of the question."
                    },
                    options: {
                        type: "array" as SchemaType,
                        description: "An array of options for mcq or msq questions. Empty if the question is of type 'text'.",
                        items: {
                            type: "string" as SchemaType
                        }
                    }
                },
                required: [
                    "type",
                    "question"
                ]
            },
            map: {
                type: "object" as SchemaType,
                description: "A map object containing a description and potentially other map-related data.",
                properties: {
                    description: {
                        type: "string" as SchemaType,
                        description: "A textual description of the map."
                    },
                    query: {
                        type: "string" as SchemaType
                    }
                },
                required: [
                    "description",
                    "query"
                ]
            },
            suggestedReplys: {
                type: "array" as SchemaType,
                items: {
                    type: "string" as SchemaType
                }
            }
        },
        required: [
            "suggestedReplys"
        ]
    },
};

export async function run(Query: string, Profile: object) {
    const parts = [
        { text: `User profile ${Profile} \n ${Query}` },
        { text: " " },
    ];
    const request: GenerateContentRequest = {
        contents: [{ role: "user", parts }],
        generationConfig: queryConfig,
    };
    const result = await model.generateContent(request);
    console.log(result.response.text());
}
async function run2() {
    const chatSession = model.startChat({
        generationConfig:queryConfig,
        history: [],
    });

    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
}

run2();