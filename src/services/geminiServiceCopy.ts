/// <reference types="chrome" />

import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface GeminiResponse {
  text: string;
  sourceUrl?: string; // Add URL to the response interface
}

// Updated function signature to accept URL
export const generateSummaryWithGemini = async (content: string, pageUrl?: string): Promise<GeminiResponse> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are a helpful AI assistant that creates concise, accurate summaries.
    
    Please provide a clear, well-structured summary of the following webpage content. Focus on the main points and key information. Use bullet points where appropriate.
    
    Webpage URL: ${pageUrl || 'Unknown'}
    
    Content to summarize:
    ${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("No summary generated");
    }

    return {
      text,
      sourceUrl: pageUrl
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};