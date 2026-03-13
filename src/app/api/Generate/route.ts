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

  // ... (keep the generateVideo call above)

  // THE FIX: Convert the raw video data into a Base64 string for the browser
  const videoFile = video; // This is the 'GeneratedFile'
  const base64Video = videoFile.base64;
  const mimeType = videoFile.mediaType || 'video/mp4';

  return new Response(JSON.stringify({ 
    // We send a "Data URL" so the browser can play it immediately
    url: `data:${mimeType};base64,${base64Video}` 
  }));
}
}