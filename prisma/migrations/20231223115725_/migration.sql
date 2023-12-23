/*
  Warnings:

  - You are about to drop the `UserValue` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserValue" DROP CONSTRAINT "UserValue_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserValue";

-- CreateTable
CREATE TABLE "PriceAlarms" (
    "id" TEXT NOT NULL,
    "isin" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PriceAlarms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PriceAlarms" ADD CONSTRAINT "PriceAlarms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
