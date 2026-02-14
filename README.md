# Chat with PDF — Production-Grade RAG System

A cloud-native **Retrieval-Augmented Generation (RAG)** application that allows users to upload PDFs and interact with them using AWS Bedrock LLM.

Built with **Next.js, TypeScript, Prisma, PostgreSQL**, and deployed on **AWS EKS using GitOps (ArgoCD)**.

---

## Overview

This system enables semantic document querying:

- Users upload PDFs
- Documents are processed and embedded
- Embeddings are stored in a vector database
- User queries retrieve relevant document context
- AWS Bedrock LLM generates grounded responses

The architecture is designed for scalability, observability, and production readiness.

---

## Architecture

### RAG Pipeline

1. PDF uploaded → stored in Amazon S3
2. Text extracted and tokenized
3. Text chunked (context-aware splitting)
4. Chunks embedded using AWS Bedrock Titan
5. Embeddings stored in Pinecone (Vector DB)
6. User submits query
7. Query embedded
8. Top-K semantic matches retrieved from Pinecone
9. Retrieved context + query sent to AWS Bedrock Nova
10. Response streamed to frontend

This ensures responses are grounded in user-provided documents.

---

## Tech Stack

### Application

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Server-side streaming

### AI Layer

- AWS Bedrock Titan — Embeddings
- AWS Bedrock Nova — LLM inference
- Pinecone — Vector similarity search

### Storage

- Amazon S3 — PDF storage
- PostgreSQL — Metadata & chat history

### DevOps / Infrastructure

- Docker
- Amazon ECR
- AWS EKS (Kubernetes)
- ArgoCD (GitOps)
- AWS ALB Ingress Controller
- CloudWatch (logs & metrics)
- IAM (fine-grained permissions)

---

## Infrastructure Workflow

### CI/CD Pipeline

1. Code pushed to GitHub
2. CI pipeline:
   - Build
   - Test
   - Dockerize
   - Push image to Amazon ECR
   - Update GitOps repository
3. ArgoCD detects manifest changes
4. Deployment applied to EKS

Declarative, Git-driven deployment model.

---

## Security

- IAM roles for service-to-service communication
- Scoped permissions for:
  - S3
  - Bedrock
  - ECR
- Kubernetes RBAC
- Secrets managed via Kubernetes

---

## Observability

- CloudWatch logs and metrics
- Structured application logging
- Health and readiness probes
- ALB traffic monitoring

---

## Scalability

- Stateless application containers
- Horizontal Pod Autoscaling (EKS)
- Independent scaling of API and embedding workloads
- Optimized Top-K retrieval for vector search
- Context-size-aware chunking strategy

---

## Local Development

````bash
npm install
npx prisma generate
npm run dev


## Getting Started

1. Clone the repo
```bash
git clone https://github.com/durgax04/pdf-embedding.git
````

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

5. Add .env file

6. Run dev server

```bash
pnpm dev
```

7. Make sure you allow CORS[http://localhost:3000] of bucket and add bucket pulicy to PUT and GET operations

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
