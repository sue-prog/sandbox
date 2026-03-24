// netlify/functions/oral-exam.js

import OpenAI from "openai";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const prompt = body.prompt;

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing prompt" })
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: "You are an FAA-style oral exam assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    });

    const text = completion.choices[0].message.content;

    // The model returns JSON text — parse it
    const json = JSON.parse(text);

    return {
      statusCode: 200,
      body: JSON.stringify(json)
    };
  } catch (err) {
    console.error("LLM backend error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "LLM backend failure" })
    };
  }
}
