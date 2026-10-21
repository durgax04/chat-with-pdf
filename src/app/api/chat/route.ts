import { authOptions } from "@/lib/auth/authOptions";
import { bedrock } from "@/lib/bedrock";
import { db } from "@/lib/prisma";
import { retrieverContext } from "@/lib/retriever";
import { AskRequest, MessageRole } from "@/types/chat";
import { API_ERRORS } from "@/constants/errors_chat";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(API_ERRORS.UNAUTHORIZED, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) {
      return NextResponse.json(API_ERRORS.USER_NOT_FOUND, { status: 404 });
    }

    // Enforce the 4-message limit restriction
    if (dbUser.messageCount >= 4) {
      return NextResponse.json(API_ERRORS.MESSAGE_LIMIT_REACHED, { status: 429 });
    }

    const { fileId, question }: AskRequest = await req.json();

    if (!fileId || !question) {
      return NextResponse.json(API_ERRORS.MISSING_PARAMS, { status: 400 });
    }

    await db.message.create({
      data: {
        fileId,
        text: question,
        role: MessageRole.USER,
        content: question,
        isUser: true,
      },
    });

    // Retrieve PDF context
    const context = await retrieverContext(question, fileId);
    const model_Id = process.env.MODEL_ID;

    if (!model_Id) {
      throw new Error("MODEL_ID environment variable is missing.");
    }

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
        temperature: 0.3,
      },
    };

    const command = new InvokeModelCommand({
      modelId: model_Id,
      body: JSON.stringify(bodyPayload),
      accept: "application/json",
      contentType: "application/json",
    });

    const response = await bedrock.send(command);
    
    if (!response.body) {
      throw new Error("Empty response body received from Bedrock runtime.");
    }

    const responseBody = await new Response(response.body).text();
    const parsed = JSON.parse(responseBody);

    const answer =
      parsed.output?.message?.content
        ?.map((c: any) => c.text)
        .join(" ")
        .trim() || "No answer found";

    // Save system message AND increment user's messageCount atomically
    await db.$transaction([
      db.message.create({
        data: {
          fileId,
          text: answer,
          role: MessageRole.SYSTEM,
          content: answer,
          isUser: false,
        },
      }),
      db.user.update({
        where: { email: session.user.email },
        data: {
          messageCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error("[API_CHAT_ERROR]", {
      message: error?.message || "Unknown error",
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(API_ERRORS.CHAT_FAILED, { status: 500 });
  }
}