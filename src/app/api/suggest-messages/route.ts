import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous feedback giving platform, like Jotform.com, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'Great coffee and cozy atmosphere! The staff is friendly, but the service can be a bit slow during peak hours.||I really liked your recent course on Full Stack Development!||The equipment is decent, but the gym is overcrowded in the evenings, and the locker rooms need more regular cleaning.'. Ensure the feedbacks are positive, positive and negative but not insulting to anybody";

      const response = await openai.completions.create({
        model: 'gpt-3.5-turbo',
        max_tokens: 400,
        stream: true,
        prompt,
      });

      const stream = OpenAIStream(response);
    
    
      return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
        const { name, status, headers, message } = error;
        return NextResponse.json({
            name,status, headers, message
        }, {status})
    } else{
        console.error("An unexpected error occured", error);
        throw error;
    }
  }
}