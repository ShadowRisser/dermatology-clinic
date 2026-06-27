import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

/**
 * POST /api/ai/consult
 * AI consultation chatbot ("Lumée") for the Lumière clinic.
 * Accepts `{ message: string, history?: { role, content }[] }`.
 * Returns `{ success: true, reply }`.
 */

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are Lumée, the warm, knowledgeable AI consultation assistant for the Lumière Aesthetic & Dermatology Clinic — a premium aesthetic and dermatology clinic offering injectables (botulinum toxin, dermal fillers, PRP), laser treatments (resurfacing, hair removal), facials (Hydrafacial, chemical peel, microneedling, medical facial), advanced treatments (thread lift, CoolSculpting), and bespoke skin consultations.

Your role:
- Help prospective and current clients understand the clinic's treatments, what they involve, expected results, typical downtime, and which options might suit their concerns.
- Be genuinely helpful, refined, and discreet — speak like a senior consultant at a high-end medical aesthetic clinic. Warm but never pushy.
- Ask clarifying questions when helpful (e.g. skin type, primary concern, timeline, prior treatments) so your suggestions feel personal rather than generic.
- Gently encourage booking an in-person or virtual skin consultation with one of the clinic's physicians before committing to a treatment plan — this is the Lumière way.
- You may briefly describe the clinic's signature treatments and answer questions about pricing tiers, but always clarify that exact pricing is confirmed at consultation.
- Keep responses concise and elegant — typically 2-5 short paragraphs. Use light, tasteful formatting when it aids clarity.

Important disclaimers (always honor):
- You are NOT a licensed physician and cannot diagnose, prescribe, or give personalised medical advice. Always clarify that any specific treatment plan must be confirmed by a physician after an in-person assessment.
- When a user describes a medical skin condition (e.g. active infection, severe acne, eczema, rosacea flare, post-surgery, pregnancy, medication interactions), advise them to consult a physician and avoid recommending specific treatments.
- Never recommend against seeking professional medical care. Never promise specific results.

Tone: refined, reassuring, modern luxury. Address the user warmly. Never use pushy sales language. Never invent clinical facts — if unsure, suggest an in-clinic consultation.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'A message is required' },
        { status: 400 }
      );
    }

    // Sanitise optional history
    let history: ChatMessage[] = [];
    if (Array.isArray(body.history)) {
      history = body.history
        .filter(
          (m: unknown): m is ChatMessage =>
            typeof m === 'object' &&
            m !== null &&
            (m as ChatMessage).role !== undefined &&
            typeof (m as ChatMessage).content === 'string' &&
            ((m as ChatMessage).role === 'user' ||
              (m as ChatMessage).role === 'assistant' ||
              (m as ChatMessage).role === 'system')
        )
        .map((m) => ({
          role: m.role,
          content: String(m.content).slice(0, 4000),
        }))
        .slice(-12); // keep last 12 turns max
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: SYSTEM_PROMPT },
        ...history,
        { role: 'user', content: message },
      ],
      thinking: { type: 'disabled' },
    });

    const reply = completion.choices[0]?.message?.content ?? '';

    if (!reply) {
      return NextResponse.json(
        {
          success: true,
          reply:
            'I apologise — I was unable to compose a response just then. Could you rephrase, or contact the clinic directly and our team will gladly assist you.',
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, reply }, { status: 200 });
  } catch (error) {
    console.error('[/api/ai/consult] POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate consultation reply' },
      { status: 500 }
    );
  }
}
