import { getPineconeClient } from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { BedrockEmbeddings } from "@langchain/aws";

export async function retrieverContext(query: string, fileId: string) {

  const embedding = new BedrockEmbeddings({
        region: process.env.AWS_REGION!,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
        model: process.env.MODEL!,
      });

  const pinecone = await getPineconeClient();
  const store = await PineconeStore.fromExistingIndex(embedding, {
    pineconeIndex: pinecone.Index("chat-pdf"),
    namespace: fileId,
  });

  const results = await store.similaritySearch(query, 5);

  return results.map((doc) => doc.pageContent).join("\n\n");
}
  