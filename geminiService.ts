
import { GoogleGenAI } from "@google/genai";

export class GeminiMathService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async solveProblem(problem: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Solve the following high school math problem (SSC Class 10 level). Provide a step-by-step explanation in clear English and optionally in Bengali. Format your output as a Markdown string with headings for steps. 
        
        Problem: ${problem}`,
        config: {
          systemInstruction: "You are an expert math teacher at Apurba Math Center. You solve problems clearly, step-by-step, helping students understand the underlying concepts. Use LaTeX for math notation where appropriate.",
          temperature: 0.7,
        }
      });

      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to get solution from AI. Please try again later.");
    }
  }

  async getHints(problem: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide 2 small, helpful hints for solving this math problem without giving away the full answer. 
        
        Problem: ${problem}`,
        config: {
          systemInstruction: "You are a supportive math tutor. Give hints that point students to the right formula or concept.",
          temperature: 0.9,
        }
      });

      return response.text;
    } catch (error) {
      console.error("Gemini Hint Error:", error);
      return "Unable to generate hints right now.";
    }
  }
}

export const mathAi = new GeminiMathService();
