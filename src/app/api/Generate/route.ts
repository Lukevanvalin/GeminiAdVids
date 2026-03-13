export const maxDuration = 60; // This forces the timeout to 60 seconds
export const dynamic = 'force-dynamic';import { google } from '@ai-sdk/google';
import { generateText, experimental_generateVideo as generateVideo } from 'ai';

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    // 1. Researching the ERP
    const { text: uiDescription } = await generateText({
      model: google('gemini-1.5-pro'),
      prompt: `Research ${context}. Describe its UI layout for a video generation prompt.`,
    });

    // 2. Generating the Video
    const { video } = await generateVideo({
      model: google.video('veo-3.1-generate-001'),
      prompt: `Cinematic 4K. ${prompt}. UI background looks like ${uiDescription}.`,
    });

    // 3. The Bulletproof Return
    // We use 'as any' to stop TypeScript from complaining about the 'url' property
    const videoData = video as any;
    const finalUrl = videoData.url || `data:${videoData.mediaType};base64,${videoData.base64}`;

    return new Response(JSON.stringify({ url: finalUrl }));
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}