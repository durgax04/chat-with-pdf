import { getPineconeClient } from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { embedding } from "./bedrock"; // importing the global singleton instance

// Test required
export async function retrieverContext(query: string, fileId: string) {
  const pinecone = await getPineconeClient();
  
  // Reuse the global embedding instance
  const store = await PineconeStore.fromExistingIndex(embedding, {
    pineconeIndex: pinecone.Index("chat-pdf"),
    namespace: fileId,
  });

  const results = await store.similaritySearch(query, 5);

  return results.map((doc) => doc.pageContent).join("\n\n");
}
