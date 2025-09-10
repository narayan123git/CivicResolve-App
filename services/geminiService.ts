
import { GoogleGenAI, Type } from "@google/genai";
import { ReportCategory, ReportPriority } from '../types';

// This is a MOCK service. In a real application, you would implement
// the commented-out code below and ensure your API key is stored securely.

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface AIEnhancementResult {
    category: ReportCategory;
    priority: ReportPriority;
    title: string;
}

/**
 * Analyzes an issue's description and image to suggest a category, priority, and title.
 * @param description - The user-submitted description of the issue.
 * @param imageBase64 - The base64 encoded image data.
 * @returns A promise that resolves to an object with the suggested category, priority, and title.
 */
export const analyzeIssueWithAI = async (
    description: string,
    imageBase64: string | null
): Promise<AIEnhancementResult> => {
    console.log("Simulating AI analysis for:", description);

    // MOCK IMPLEMENTATION
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API latency
    
    const categories = Object.values(ReportCategory);
    const priorities = Object.values(ReportPriority);
    
    // Simple logic for mock response
    const mockCategory = categories[description.length % categories.length];
    const mockPriority = priorities[description.length % priorities.length];
    const mockTitle = description.split(' ').slice(0, 5).join(' ') + '...';

    const result: AIEnhancementResult = {
        category: mockCategory,
        priority: mockPriority,
        title: mockTitle,
    };
    console.log("Simulated AI result:", result);
    return result;

    /*
    // REAL GEMINI API IMPLEMENTATION
    // This code would replace the mock implementation above.
    // It requires setting up the Gemini API key in your environment.

    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const imagePart = imageBase64 ? {
        inlineData: {
            mimeType: 'image/jpeg', // Assuming jpeg, adjust if necessary
            data: imageBase64,
        },
    } : null;

    const textPart = {
        text: `Analyze the following civic issue report. Based on the description and image, provide a suitable category, a priority level (Low, Medium, High), and a concise title (max 7 words). The description is: "${description}"`,
    };

    const parts = imagePart ? [textPart, imagePart] : [textPart];

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        category: { 
                            type: Type.STRING,
                            description: `One of the following: ${Object.values(ReportCategory).join(', ')}`
                        },
                        priority: { 
                            type: Type.STRING,
                            description: `One of the following: ${Object.values(ReportPriority).join(', ')}`
                        },
                        title: {
                             type: Type.STRING,
                             description: 'A concise title for the report, maximum of 7 words.'
                        }
                    },
                    required: ["category", "priority", "title"]
                }
            }
        });

        const jsonString = response.text.trim();
        const parsedResult = JSON.parse(jsonString);

        // Validate the response to ensure it matches our types
        const category = Object.values(ReportCategory).includes(parsedResult.category) ? parsedResult.category : ReportCategory.Other;
        const priority = Object.values(ReportPriority).includes(parsedResult.priority) ? parsedResult.priority : ReportPriority.Medium;

        return {
            category,
            priority,
            title: parsedResult.title
        };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Fallback to a default response in case of an API error
        return {
            category: ReportCategory.Other,
            priority: ReportPriority.Medium,
            title: "AI Analysis Failed - Manual Review Needed",
        };
    }
    */
};
