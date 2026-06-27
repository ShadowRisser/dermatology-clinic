import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

/**
 * POST /api/ai/skin-analysis
 * Accepts `{ image: string }` where `image` is a base64 data URL
 * (data:image/...;base64,...) of the user's face/skin photo.
 *
 * Uses the z-ai-web-dev-sdk VLM to analyse the visible skin and return
 * structured JSON: overallScore, skinType, concerns[], strengths[],
 * recommendations[], summary.
 */

const SKIN_ANALYSIS_PROMPT = `You are an expert, board-certified dermatologist with deep experience in cosmetic and aesthetic medicine. You are analysing a single photograph of a person's face/skin provided by a user of the Lumière Aesthetic & Dermatology Clinic platform.

Your task:
1. Carefully observe the visible skin in the photo — tone, texture, hydration, fine lines, pigmentation, pores, redness, clarity, elasticity, and any visible concerns.
2. Assess the skin and produce a structured analysis.

Return STRICT JSON with EXACTLY this shape — and nothing else:
{
  "overallScore": number,           // 0-100, overall skin health/appearance score
  "skinType": string,               // e.g. "Normal", "Dry", "Oily", "Combination", "Sensitive", "Mature"
  "concerns": [                     // 2-5 visible concerns, ordered by prominence
    {
      "name": string,               // e.g. "Fine lines", "Hyperpigmentation", "Enlarged pores"
      "severity": "mild" | "moderate" | "advanced",
      "score": number               // 0-100, severity score
    }
  ],
  "strengths": [string],            // 2-4 positive attributes of the skin
  "recommendations": [              // 2-4 treatment/skincare recommendations
    {
      "treatment": string,          // e.g. "Hydrafacial", "Vitamin C serum", "Daily SPF 50"
      "reason": string,             // why this would help
      "priority": "high" | "medium" | "low"
    }
  ],
  "summary": string                 // 2-3 sentence warm, professional summary
}

Important rules:
- Respond with ONLY valid JSON. No markdown fences, no commentary, no preamble, no trailing text.
- Be honest but constructive — this is for educational and aesthetic guidance, never for diagnosis.
- If image quality is poor or no face/skin is visible, still return valid JSON with conservative scores and a note in the summary.
- Use professional, warm language consistent with a luxury dermatology clinic.
- Do NOT include any personally identifying observations about the individual.`;

/**
 * Strips ```json ... ``` code fences (and any leading/trailing whitespace)
 * from the model's output so the result can be safely JSON.parsed.
 */
function stripCodeFences(raw: string): string {
  let s = raw.trim();
  // Remove a leading ```json or ``` and a trailing ```
  const fenceStart = s.match(/^```(?:json)?\s*/i);
  if (fenceStart) {
    s = s.slice(fenceStart[0].length);
  }
  if (s.endsWith('```')) {
    s = s.slice(0, -3);
  }
  return s.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const image = typeof body.image === 'string' ? body.image.trim() : '';
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'An image (base64 data URL) is required' },
        { status: 400 }
      );
    }
    if (!image.startsWith('data:image/')) {
      return NextResponse.json(
        { success: false, error: 'Image must be a base64 data URL starting with "data:image/"' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();
    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: SKIN_ANALYSIS_PROMPT },
            { type: 'image_url', image_url: { url: image } },
          ],
        },
      ],
      thinking: { type: 'disabled' },
    });

    const rawContent = response.choices[0]?.message?.content ?? '';

    if (!rawContent) {
      return NextResponse.json(
        { success: true, analysis: null, raw: '' },
        { status: 200 }
      );
    }

    const cleaned = stripCodeFences(rawContent);

    try {
      const analysis = JSON.parse(cleaned);
      return NextResponse.json({ success: true, analysis }, { status: 200 });
    } catch {
      // JSON parse failed — return the raw content so the client can decide.
      return NextResponse.json(
        { success: true, analysis: null, raw: rawContent },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[/api/ai/skin-analysis] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyse skin image' },
      { status: 500 }
    );
  }
}
