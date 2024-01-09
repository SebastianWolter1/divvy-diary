-- CreateEnum
CREATE TYPE "InitialPrice" AS ENUM ('higher', 'lower');

-- AlterTable
ALTER TABLE "PriceAlarms" ADD COLUMN     "initialPrice" "InitialPrice";
