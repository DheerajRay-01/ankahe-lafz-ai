import { GoogleGenerativeAI } from "@google/generative-ai";
import { addResponse } from "../redux/slices/responseSlice";
import {systemPrompts} from './systemInstructions.js'
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const geminiResponse = async (prompt, dispatch, lang) => {
  try {
    const genAI = new GoogleGenerativeAI(`${API_KEY}`);

    // Select system prompt based on the chosen language
    const systemInstruction = systemPrompts[lang] || systemPrompts["hindi"]; // Default to Hindi if lang is undefined
    //  console.log(systemInstruction);
     
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction, // Pass the correct system prompt
    });

    const result = await model.generateContent(prompt);
    if (!result) {
      console.log("Error fetching response");
      return;
    }

    const response = result.response.text();
    dispatch(addResponse(response));
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw error;
  }
};