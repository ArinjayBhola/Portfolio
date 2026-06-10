import { NextResponse } from 'next/server';
import { chatWithGroq } from '@/lib/groq';

export async function POST(req: Request) {
  try {
    const { messages, pageContext } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const result = await chatWithGroq(messages, pageContext);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
