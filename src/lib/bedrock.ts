import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import { BedrockEmbeddings } from "@langchain/aws";

const bedrock = new BedrockRuntimeClient({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    },
    
});

const embedding = new BedrockEmbeddings({
      region: process.env.AWS_REGION!,

      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },

      model: process.env.MODEL!,
    });

export {bedrock, embedding};