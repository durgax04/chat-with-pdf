import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import { BedrockEmbeddings } from "@langchain/aws";

// single source of truth for the AWS client
const bedrock = new BedrockRuntimeClient({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    },
});

// pass the client instance directly to LangChain
const embedding = new BedrockEmbeddings({
    client: bedrock, // reuses the exact same client configuration above
    model: process.env.MODEL!,
});

export { bedrock, embedding };