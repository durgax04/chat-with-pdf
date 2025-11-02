This is a pdf-chat-app for learning chunking, embedding model integration, store in vectorDB, retirive via LLM in msg form.

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/durgax04/pdf-embedding.git 
```

2. Install all dependencies
```bash
pnpm install
```
3. Prisma migration
```bash
npx prisma migrate dev --name init
```
4. Generate prisma client
```bash
npx prisma generate
```

5. Add .env file (Update credentials)

6. Run dev server
```bash
pnpm dev
```

7. Make sure you allow CORS[http://localhost:3000] of bucket and add bucket pulicy to PUT and GET operations

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
