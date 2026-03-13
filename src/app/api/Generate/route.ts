import { google } from '@ai-sdk/google';
import { generateText, experimental_generateVideo as generateVideo } from 'ai';

export async function POST(req: Request) {
  const { prompt, context } = await req.json();

  // 1. Gemini researches the ERP vibe
  const { text: uiDescription } = await generateText({
    model: google('gemini-1.5-pro'),
    prompt: `Research ${context}. Describe its UI layout (colors, grids) so I can recreate it without using proprietary logos.`,
  });

  // 2. Veo 3.1 generates the cinematic video
  const { video } = await generateVideo({
    model: google.video('veo-3.1-generate-001'),
    prompt: `Professional cinematic 4K video. A user interacts with a dashboard that looks like ${uiDescription}. ${prompt}.`,
  });

  return new Response(JSON.stringify({ url: video.url }));
}