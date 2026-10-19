# Cloud-Native RAG Platform

A document-based Retrieval-Augmented Generation (RAG) application that
turns PDF documents into searchable context for AI-generated responses.

The application combines **Next.js and TypeScript**, **Amazon S3**,
**Amazon Bedrock**, **Pinecone**, and **PostgreSQL**. Its workflow
separates document ingestion from user-facing retrieval and
generate responses.

---

## Contents

- [Engineering Highlights](#engineering-highlights)
- [Architecture](#architecture)
- [System Pipelines](#system-pipelines)
  - [1. Ingestion Pipeline](#1-ingestion-pipeline)
  - [2. Retrieval and Generation](#2-retrieval-and-generation)
- [Technology Stack](#technology-stack)
- [Deployment and GitOps](#deployment-and-gitops)
- [Security and Workload Isolation](#security-and-workload-isolation)
- [Observability](#observability)
- [Local Development](#local-development)
  - [Prerequisites](#prerequisites)
  - [1. Clone the repository](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Configure environment variables](#3-configure-environment-variables)
  - [4. Apply database migrations](#4-apply-database-migrations)
  - [5. Start the development server](#5-start-the-development-server)
- [Project Structure](#project-structure)
- [Architecture and Design Decisions](#architecture-and-design-decisions)
  - [Pinecone instead of pgvector](#pinecone-instead-of-pgvector)
  - [Amazon Bedrock for embeddings and generation](#amazon-bedrock-for-embeddings-and-generation)
  - [Presigned S3 uploads instead of proxying files through the API](#presigned-s3-uploads-instead-of-proxying-files-through-the-api)
  - [Separate ingestion worker instead of processing inside the request path](#separate-ingestion-worker-instead-of-processing-inside-the-request-path)
  - [GitOps with Argo CD](#gitops-with-argo-cd)

---

## Engineering Highlights

-   **Direct document uploads:** Browser uploads to Amazon S3 using
    presigned URLs, avoiding the need to send PDF payloads through the
    application API.
-   **Background ingestion:** A separate worker handles PDF retrieval,
    text extraction, recursive chunking, and embedding generation.
-   **Dense embeddings:** Amazon Titan Text Embeddings V2 generates
    1024-dimensional vectors for document chunks and user queries.
-   **Semantic retrieval:** Pinecone performs similarity search with
    metadata filters such as `user_id` and `file_id`.
-   **Grounded generation:** Retrieved document context is assembled
    with the user prompt and sent to Amazon Bedrock Nova.
-   **Application persistence:** PostgreSQL and Prisma store application
    data, file metadata, and chat history.
-   **Cloud deployment workflow:** The repository documents
    containerized deployment to AWS EKS, image publishing to Amazon ECR,
    GitHub Actions, and Argo CD GitOps.

## Architecture
![Architecture](./doc/images/rag-pipeline.png)

## System Pipelines
![System Pipelines](./doc/images/SystemPipelines.png)

The workflow:

1.  The client requests a presigned upload URL from the API.
2.  The browser uploads the PDF directly to Amazon S3.
3.  The ingestion worker retrieves the document for processing.
4.  The document text is split into overlapping chunks using recursive
    character chunking.
5.  Each chunk is associated with metadata such as `file_id`, `user_id`,
    and `index_id`.
6.  Amazon Titan Text Embeddings V2 generates a 1024-dimensional
    embedding for each chunk.
7.  The vectors and associated metadata are upserted into Pinecone.

### 2. Retrieval and Generation
![Retrieval and Generation](./doc/images/RetrievalandGeneration.png)


The retrieval workflow:

1.  The user query is converted into an embedding using Amazon Titan
    Text Embeddings V2.
2.  Pinecone searches for similar vectors with metadata filters,
    including `user_id` and `file_id`.
3.  The top five retrieved chunks are selected as context.
4.  Relevant context, conversation history, and the current prompt are
    assembled for generation.
5.  Amazon Bedrock Nova generates a response that is streamed to the
    browser over SSE.

## Technology Stack

| Area | Technologies |
| :--- | :--- |
| **Frontend** | Next.js App Router, TypeScript, Tailwind CSS |
| **API** | Next.js Route Handlers, Node.js |
| **Relational Data** | PostgreSQL, Prisma ORM |
| **Document Storage** | Amazon S3 |
| **Embeddings** | Amazon Bedrock Titan Text Embeddings V2 |
| **Generation** | Amazon Bedrock Nova |
| **Vector Search** | Pinecone |
| **Containers** | Docker |
| **Container Registry** | Amazon ECR |
| **Orchestration** | Kubernetes on AWS EKS |
| **CI** | GitHub Actions |
| **GitOps** | Argo CD |
| **Ingress** | AWS Load Balancer Controller |
| **Logs** | Amazon CloudWatch |

## Deployment and GitOps

ops repo:
[github.com/durgax04/ops](https://github.com/durgax04/ops)

![Deployment](./doc/images/deployment.png)

-   **CI:** GitHub Actions runs the configured validation and build
    steps and publishes container images to Amazon ECR.
-   **Desired state:** Kubernetes manifests are maintained in Git.
-   **Reconciliation:** Argo CD compares the declared configuration with
    the cluster state and synchronizes changes.
-   **Ingress:** AWS Load Balancer Controller integrates Kubernetes
    ingress configuration with an Application Load Balancer.
-   **Rollback approach:** The documented GitOps approach uses Git
    history and reverting a configuration change to restore a previous
    desired state.

## Security and Workload Isolation

The design documents the following security measures and considerations:

-   **Presigned S3 URLs:** The browser transfers document files directly
    to S3 using time-limited URLs.
-   **IAM permissions:** AWS access should be scoped to the resources
    and operations required by each workload.
-   **Workload identity:** The documented EKS design uses IAM Roles for
    Service Accounts (IRSA) to provide workload-specific AWS
    permissions.
-   **Secrets:** Database credentials and third-party API keys are
    configured as Kubernetes Secrets.
-   **Metadata filtering:** Vector queries include tenant-related
    metadata such as `user_id` and `file_id`.

Metadata filters are one part of tenant isolation. The API must also
authenticate the caller, authorize access to the requested document, and
derive or validate filter values on the server rather than trusting
client-supplied identifiers.

## Observability


## Local Development

### Prerequisites

-   Node.js 20 or later
-   pnpm
-   Docker and Docker Compose
-   AWS CLI configured with the required Amazon S3 and Amazon Bedrock
    permissions
-   A Pinecone account and a provisioned serverless index configured for
    1024-dimensional vectors with cosine similarity
-   PostgreSQL

### 1. Clone the repository

``` bash
git clone https://github.com/durgax04/pdf-embedding.git
cd pdf-embedding
```

### 2. Install dependencies

``` bash
pnpm install
```

### 3. Configure environment variables

Create a local environment file from the example:

``` bash
cp .env.example .env
```

Populate the variables with your own local configuration:

``` env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rag_db?schema=public"

# AWS
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
S3_BUCKET_NAME="your-rag-storage-bucket"

# Pinecone
PINECONE_API_KEY="your-pinecone-api-key"
PINECONE_INDEX_NAME="your-index-name"
```

Use credentials appropriate for your environment. Do not commit `.env`
files or real secrets to Git.

Configure the S3 bucket CORS policy for the local frontend origin
(`http://localhost:3000`) and the methods and headers required by the
upload flow.

### 4. Apply database migrations

``` bash
npx prisma migrate dev --name init
npx prisma generate
```

If the database has already been initialized, use the migration workflow
appropriate for your existing schema rather than creating a duplicate
initial migration.

### 5. Start the development server

``` bash
pnpm dev
```

Open <http://localhost:3000> in your browser.

> **Note:** Local setup may require additional service-specific
> configuration depending on the current repository implementation.
> Check `.env.example`, package scripts, and the application
> configuration for the authoritative list of required variables and
> commands.

## Project Structure

The application code is organized under `src/app`, with API routes, UI
pages, reusable components, and shared libraries.

``` text
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── file/
│   │   │   └── [fileId]/
│   │   │       ├── download/
│   │   │       └── view/
│   │   ├── file-status/
│   │   ├── health/
│   │   │   ├── live/
│   │   │   └── ready/
│   │   ├── messages/
│   │   └── process-pdf/
│   ├── chat/
│   │   └── [fileId]/
│   ├── dashboard/
│   └── ...
├── assets/
├── components/
├── lib/
│   ├── action/
│   └── auth/
└── types/
```

This is a high-level view based on the documented structure; consult the
repository for the complete current tree.

## Architecture and Design Decisions

### Pinecone instead of pgvector

**Decision:** Use Pinecone as the vector index and PostgreSQL for
relational application data.

**Trade-off:** This introduces an external service dependency and
network overhead.

**Rationale:** Separating vector similarity search from transactional
application data keeps the vector-search workload distinct from the
primary relational database.

### Amazon Bedrock for embeddings and generation

**Decision:** Use Amazon Titan Text Embeddings V2 and Amazon Bedrock
Nova.

**Trade-off:** Model availability, IAM permissions, regional support,
and service configuration must be managed in AWS.

**Rationale:** The application uses AWS-managed model endpoints for
embedding generation and response generation.

### Presigned S3 uploads instead of proxying files through the API

**Decision:** Upload PDF files directly from the browser to S3 using
presigned URLs.

**Trade-off:** The application must handle URL issuance, upload
completion, and S3 CORS configuration.

**Rationale:** Large file payloads do not need to pass through the
Next.js API runtime, reducing application-tier network and memory work.

### Separate ingestion worker instead of processing inside the request path

**Decision:** Run document ingestion separately from user-facing API
requests.

**Trade-off:** A separate worker introduces additional deployment and
processing-state coordination.

**Rationale:** PDF extraction, chunking, and embedding generation can be
resource-intensive. Separating this work helps keep document processing
independent of interactive requests.

### GitOps with Argo CD

**Decision:** Declare Kubernetes desired state in Git and use Argo CD
for reconciliation.

**Trade-off:** Deployment timing depends on synchronization and
reconciliation behavior.

**Rationale:** Git-tracked configuration provides a reviewable history
of desired deployment state and a consistent mechanism for applying
configuration changes.
