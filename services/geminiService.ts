import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Prompts tailored for Daniel Generation School (Nursery to Grade 3)
// Focusing on young children, Rwandan context, mostly Black African children with some diversity.
const SCHOOL_SCENARIOS = [
  "Photorealistic wide shot of happy Black African nursery children in burgundy and beige uniforms playing with colorful building blocks on a soft carpet, bright classroom in Kigali",
  "A diverse group of little students (mostly Black African, one White child) working together on a drawing project at a round table, Grade 2, smiling, teamwork, warm lighting",
  "Cute little Black African girl holding a storybook, laughing with a friend, library background, neat burgundy school sweater, high quality",
  "Young children (Nursery) sitting in a circle on a green playground, mostly African, sunny day, teacher in background, safe environment",
  "Grade 1 students raising hands in class, mostly Black African students, one White student, attentive, modern classroom setting, burgundy uniforms"
];

export const generateSchoolImages = async (): Promise<string[]> => {
  if (!API_KEY) {
    console.error("API Key is missing");
    return []; 
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const generatedImages: string[] = [];

  // Select all 5 scenarios
  const selectedScenarios = SCHOOL_SCENARIOS;

  for (const prompt of selectedScenarios) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
           // Standard config for image generation
        }
      });

      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
           if (part.inlineData) {
             const base64Data = part.inlineData.data;
             generatedImages.push(`data:image/png;base64,${base64Data}`);
             break;
           }
        }
      }
    } catch (error) {
      console.error(`Failed to generate image for prompt: ${prompt}`, error);
    }
  }

  return generatedImages;
};