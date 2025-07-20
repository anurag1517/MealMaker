// utils/llm.ts
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function callLLM(prompt: string): Promise<string[]> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    // Convert bullet points to a list (optional parsing logic)
    const meals = response
      .split("\n")
      .map(line => line.replace(/^[-*\d.\s]+/, "").trim())
      .filter(Boolean);

    return meals;
  } catch (error) {
    console.error("LLM Error:", error);
    return ["No suggestions available right now."];
  }
}
