/*
  Warnings:

  - Added the required column `image` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "image" TEXT NOT NULL;
