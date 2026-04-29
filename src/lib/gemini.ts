import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface BioOption {
  tone: string;
  content: string;
}

export async function generateBios(profileData: string, careerGoals: string): Promise<BioOption[]> {
  const model = "gemini-3-flash-preview";

  const prompt = `
    You are an expert LinkedIn profile architect and career coach.
    Based on the following profile details and career goals, generate 3 distinct versions of a professional "About" section.
    
    PROFILE DETAILS:
    ${profileData}
    
    CAREER GOALS:
    ${careerGoals}
    
    VERSION 1: Professional & Results-Driven (Focus on achievements and impact)
    VERSION 2: Storytelling & Personal Brand (Focus on passion, journey, and "the why")
    VERSION 3: Short & Punchy (For executive or minimalist profiles)
    
    Output the result as a JSON array of objects with 'tone' and 'content' keys.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating bios:", error);
    throw error;
  }
}
