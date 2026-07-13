/*
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";


export class AWSBedrockEmbedding {
    private client: BedrockRuntimeClient;

    constructor() {
        this.client = new BedrockRuntimeClient({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        });
    }


    async embedDocuments(texts: string[]) {
        return Promise.all(
            texts.map((text) => this.embedQuery(text))
        );
    }


    async embedQuery(text: string): Promise<number[]> {
        const command = new InvokeModelCommand({
            modelId: "amazon.titan-embed-text-v2:0",
            contentType: "application/json",
            accept: "application/json",

            body: JSON.stringify({
                inputText: text,
            }),
        });
    
        const response = await this.client.send(command);

        const responseBody = JSON.parse(
            new TextDecoder().decode(response.body)
        );

        return responseBody.embedding;

    }

}
*/