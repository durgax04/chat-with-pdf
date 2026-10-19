# Chat with PDF: Security Hardening & Architecture Improvements

This document outlines the end-to-end architectural, security, and user experience enhancements implemented in the **Chat with PDF** application. It serves as a technical record of migration from overly permissive infrastructure and public S3 buckets to an enterprise-grade, least-privilege, and memory-efficient design.

---

## 1. Executive Summary of Improvements

| Domain | Previous State | Upgraded State |
| :--- | :--- | :--- |
| **S3 Access Control** | Public Read enabled (`Block Public Access: OFF`) with open bucket policy. | `Block Public Access: ON`, zero public bucket policy, all operations via presigned URLs and private SDK streams. |
| **AWS IAM Permissions** | Overly permissive admin privileges (`*` on `eks:*`, `iam:*`, `s3:*`, `ec2:*`). | Strict least-privilege policies scoped to `app-pdf-storage-v100/*`, Titan Embeddings v2, and Nova models. |
| **File Upload Pattern** | Multipart payload buffered through Next.js server memory. | Direct-to-S3 presigned PUT uploads executed from client with progress tracking. |
| **File Viewing & Downloading** | Public static URLs with S3 endpoint paths passed in query params. | Authenticated, short-lived presigned GET URLs with dynamic `ResponseContentDisposition` headers. |
| **Text Processing & Embeddings** | Fetching private files over HTTP `fetch()`; unmanaged `/tmp` files. | Direct AWS SDK stream consumption, automatic `/tmp` cleanup via `finally`, namespace-isolated vector indexing. |
| **Resource Deletion Lifecycle** | Incomplete cleanup leaving orphaned vectors in Pinecone and storage in S3. | Atomic 3-way cleanup (Pinecone namespace wipe + S3 object deletion + Prisma cascade delete). |
| **User Interface UX** | Modal freezing during delete latency; query string leakage of file URLs. | Instant modal exit with optimistic background deletion feedback; clean dynamic routing `/chat/[fileId]`. |

---

## 2. Infrastructure & Cloud Security (AWS)

### 2.1 Least-Privilege IAM Policy Configuration
Rather than granting application containers infrastructure administrator privileges, the application runtime identity is decoupled and strictly scoped:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ScopedS3ObjectLifecycle",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::app-pdf-storage-v100/*"
    },
    {
      "Sid": "ScopedS3BucketListing",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::app-pdf-storage-v100"
    },
    {
      "Sid": "BedrockTitanAndNovaAccess",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:*::foundation-model/amazon.nova-lite-v1:0",
        "arn:aws:bedrock:*::foundation-model/amazon.titan-embed-text-v2:0",
        "arn:aws:bedrock:*:469511672970:inference-profile/*"
      ]
    }
  ]
}
```

### 2.2 S3 Bucket Hardening
- **Block Public Access (BPA):** All four checkboxes enabled to prevent accidental exposure of uploaded documents.
- **Bucket Policy Purge:** Removed the obsolete `"PublicRead"` policy that permitted global `s3:GetObject`.
- **CORS Hardening:** Configured cross-origin resource sharing to only allow explicit trusted application origins:
  ```json
  [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT"],
      "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
  ```

---

## 3. Data Ingestion & Storage Architecture

### 3.1 Direct Browser-to-S3 Presigned Uploads
Previous implementations routed file buffers through the Next.js API route body, introducing request body size limits, memory saturation under concurrent uploads, and serverless timeout issues.

**New Flow:**
1. Browser invokes `getSignedURL` Server Action with file metadata (`name`, `type`, `size`).
2. Server validates authentication, file extension, and MIME type (`application/pdf`).
3. S3 SDK generates a presigned `PUT` URL valid for 10 minutes (`expiresIn: 600`).
4. Client executes an `XMLHttpRequest` directly to S3, rendering real-time progress percentages.
5. Client issues a completion trigger to `/api/process-pdf` with `{ fileId }`.

### 3.2 Secure In-Process PDF Ingestion
- Replaced insecure HTTP `fetch(file.url)` with private `s3.send(new GetObjectCommand({ ... }))`.
- Read streams are transformed directly to buffers in memory.
- Text extraction executes via LangChain `PDFLoader`.
- Chunks are vectorized using **Amazon Titan Text Embeddings v2** (`amazon.titan-embed-text-v2:0`) and stored inside **Pinecone** under an isolated namespace (`namespace: fileId`).
- Added guaranteed filesystem cleanup in a `finally` block to prevent `/tmp` disk depletion on host instances.

---

## 4. Viewing, Downloading, and Document Lifecycle

### 4.1 On-Demand Presigned View & Download
- Documents are never loaded from public S3 paths.
- Server-side rendering in `/chat/[fileId]` generates dynamic 1-hour presigned GET links passed directly to the secure embedded PDF iframe.
- Added `/api/file/[fileId]/download` which sets `ResponseContentDisposition: attachment; filename="..."` to trigger immediate native browser downloads under the original uploaded file name.

### 4.2 Complete Multi-Engine Cascading Delete
When deleting a chat, cleanup is synchronized across all three storage layers:
1. **Pinecone Vector Database:** Executes `await index.namespace(fileId).deleteAll()` to instantly eliminate vectorized document embeddings without iterating vector IDs.
2. **Amazon S3:** Issues `DeleteObjectCommand` using the decrypted S3 key.
3. **PostgreSQL / Prisma:** Deletes child `Message` entities and the parent `File` database record.

---

## 5. UI/UX Enhancements

### 5.1 Optimistic Background Deletion
- Clicking **Delete** in the confirmation dialog immediately unmounts the modal window, eliminating UI freezing and latency stalls.
- The corresponding chat row displays a dimmed opacity state and a loading spinner while background jobs delete vector namespaces, S3 blobs, and database rows.
- If deletion completes, the record transitions off-screen. If any step fails, an error toast alerts the user and states are gracefully rolled back.