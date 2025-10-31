import { GoogleGenAI, Modality } from "@google/genai";

export const extendImageWithGemini = async (apiKey: string, base64Image: string, mimeType: string): Promise<string> => {
    if (!apiKey) {
        throw new Error("API Key is missing. Please enter your API key.");
    }
    const ai = new GoogleGenAI({ apiKey });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: 'image/jpeg', // The composite image is always jpeg from canvas
                        },
                    },
                    {
                        text: 'Extend the inner image to naturally fill the entire canvas. This is an outpainting or image extension task. Maintain the style, lighting, and content of the original image seamlessly into the new areas. Make it look like a single, complete picture.',
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && firstPart.inlineData) {
            return firstPart.inlineData.data;
        }

        throw new Error('No image data found in the API response. The model may not have generated an image.');
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                 throw new Error('The provided API key is not valid. Please check your key and try again.');
            }
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error('An unknown error occurred while contacting the Gemini API.');
    }
};