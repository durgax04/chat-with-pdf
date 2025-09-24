/*
  Warnings:

  - You are about to drop the column `status` on the `File` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."UploadStatus" AS ENUM ('PROCESSING', 'FAILED', 'SUCCESS');

-- AlterTable
ALTER TABLE "public"."File" DROP COLUMN "status",
ADD COLUMN     "uploadStatus" "public"."UploadStatus" NOT NULL DEFAULT 'PROCESSING';
