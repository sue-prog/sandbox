// netlify/functions/oral-exam.js
//redeploy test

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

    const text = completion.choices?.[0]?.message?.content;
    
    if (!text) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Model returned no content" })
      };
    }
    
    let json;
    try {
      json = JSON.parse(text);
    } catch (parseErr) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Model did not return valid JSON",
          raw: text
        })
      };
    }


    return {
      statusCode: 200,
      body: JSON.stringify(json)
    };
  } catch (err) {
     return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message, stack: err.stack })
  };
}

}
