
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("API_KEY is not set. Using a mock response.");
}

export const generateBatmanWitnessStatement = async (person1: string, person2: string): Promise<string> => {
  if (!API_KEY) {
    // Return a mock response if API key is not available
    return new Promise(resolve => setTimeout(() => resolve(`In the darkest of nights, I bear witness to the union of ${person1} and ${person2}. May their bond be as strong as the Gotham night.`), 1000));
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `You are Batman. Write a very short, solemn, and slightly dramatic witness statement for the marriage of ${person1} and ${person2}. Keep it to one or two sentences. Do not use quotation marks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to get a statement from the shadows.");
  }
};
