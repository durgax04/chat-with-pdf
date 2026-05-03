import bedrock from "@/lib/bedrock";
import { db } from "@/lib/prisma";
import { retrieverContext } from "@/lib/retriever";
import { AskRequest } from "@/types/chat";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { fileId, question }: AskRequest = await req.json();

    if (!fileId || !question) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    await db.message.create({
      data: {
        fileId,
        text: question,
        role: "USER",
        content: question,
        isUser: true,
      },
    });

    // retrieve PDF context
    const context = await retrieverContext(question, fileId);

    // use arn
    // Can't directly invoke nova text&vision model
    const model_Id = process.env.MODEL_ID!;

    // Model request format (doesn't support role system)
    const prompt = `
You are a helpful assistant that answers questions based ONLY on the provided PDF context.

Guidelines:
- Answer in a natural, human-friendly way like ChatGPT
- Use simple and clear language
- Use short paragraphs
- Avoid excessive markdown like ** or unnecessary bullet points
- Use bullet points only if they improve clarity
- Keep the answer concise but informative
- If the answer is not in the context, say: "I couldn't find this information in the provided document."

Context:
${context}

Question:
${question}

Answer:
`.trim();

    const bodyPayload = {
      messages: [
        {
          role: "user",
          content: [{ text: prompt }],
        },
      ],
      inferenceConfig: {
        maxTokens: 512,
        temperature: 0.3, // slightly more natural
      },
    };

    const command = new InvokeModelCommand({
      modelId: model_Id,
      body: JSON.stringify(bodyPayload),
      accept: "application/json",
      contentType: "application/json",
    });

    const response = await bedrock.send(command);
    const responseBody = await new Response(response.body).text();
    const parsed = JSON.parse(responseBody);
    console.log("Answer content----", parsed.output?.message?.content);

    // extract answer
    // const answer = parsed.output?.message?.content?.[0]?.text ?? "No answer found";
    const answer =
      parsed.output?.message?.content
        ?.map((c: any) => c.text)
        .join(" ")
        .trim() || "No answer found";

    console.log("Answer----", answer);
    console.log(JSON.stringify(answer, null, 2));

    await db.message.create({
      data: {
        fileId,
        text: answer,
        role: "SYSTEM",
        content: answer,
        isUser: false,
      },
    });

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error in chat route-----", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
