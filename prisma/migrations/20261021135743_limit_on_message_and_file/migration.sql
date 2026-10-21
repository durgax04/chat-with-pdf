/*
  Warnings:

  - You are about to drop the column `embeddingCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "embeddingCount",
ADD COLUMN     "messageCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pdfUploadCount" INTEGER NOT NULL DEFAULT 0;
