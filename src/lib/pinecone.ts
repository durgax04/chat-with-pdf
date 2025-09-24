import { Pinecone } from '@pinecone-database/pinecone';

let pinecone: Pinecone | null = null;

export async function getPineconeClient() {
  if (!pinecone) {
    if (!process.env.PINECONE_API_KEY_HUGG_EMBDD) {
      throw new Error("Missing PINECONE_API_KEY_HUGG_EMBDD in environment");
    }

    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY_HUGG_EMBDD,
    });
  }
  return pinecone;
}