import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function test() {
  try { 
    const command = new InvokeModelCommand({
      modelId: process.env.MODEL || "amazon.titan-embed-text-v2:0",
      contentType: "application/json",
      accept: "application/json",
      // Titan v2 expects { inputText: "..." } in the body
      body: JSON.stringify({ inputText: "Testing Bedrock Embeddings" }),
    });

    const res = await client.send(command);
    console.log("SUCCESS! Bedrock responded with status:", res.$metadata.httpStatusCode);
    
    const responseBody = JSON.parse(new TextDecoder().decode(res.body));
    console.log("Vector dimensions generated:", responseBody.embedding.length);
  } catch (err) {
    console.error("BEDROCK ERROR:", err);
  }
}

test();