import { GoogleGenAI } from "@google/genai";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompt.util.js";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


export const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus,description, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt({role, experience, topicsToFocus, description,numberOfQuestions});

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let rawText = response.text;

        // Clean it: Remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .replace(/[*#\/]/g, "")
            .replace(/\n/g, "")
            .trim();

        res.status(200).json(JSON.parse(cleanedText));
    } catch (error) {
        console.error("Error generating questions:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};


export const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const rawText = response.text || "";

        // First, try to clean the text assuming it's JSON
        let cleanedText = rawText
            .replace(/^```json\s*/g, '')  // Remove starting ```json
            .replace(/```$/g, '')         // Remove ending ```
            .replace(/\\n/g, ' ')         // Replace \n with space
            .replace(/\n/g, ' ')          // Replace actual newlines with space
            .trim();                      // Remove extra spaces

        try {
            // Try parsing the cleaned text
            const parsedData = JSON.parse(cleanedText);
            return res.status(200).json(parsedData);
        } catch (firstParseError) {
            // If first parse fails, try an alternative cleaning approach
            try {
                // Remove any markdown formatting and try to extract JSON
                cleanedText = rawText
                    .replace(/^[\s\S]*?{/, '{')  // Find first {
                    .replace(/}[\s\S]*$/, '}')   // Find last }
                    .replace(/\\n/g, ' ')
                    .replace(/\n/g, ' ')
                    .trim();

                const parsedData = JSON.parse(cleanedText);
                return res.status(200).json(parsedData);
            } catch (secondParseError) {
                // If both JSON parsing attempts fail, return a formatted response
                return res.status(200).json({
                    title: question,
                    explanation: rawText
                        .replace(/^```(?:json|javascript)?\s*/, '')
                        .replace(/```$/, '')
                        .replace(/\\n/g, ' ')
                        .replace(/\n/g, ' ')
                        .trim()
                });
            }
        }
    } catch (error) {
        console.error("Error generating concept explanation:", error);
        res.status(500).json({
            message: "Failed to generate explanation",
            error: error.message
        });
    }
};





 
