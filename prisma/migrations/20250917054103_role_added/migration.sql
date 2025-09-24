/*
  Warnings:

  - Added the required column `role` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'SYSTEM');

-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "role" "public"."Role" NOT NULL;
