/*
  Warnings:

  - The `isin` column on the `UserValue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `price` column on the `UserValue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserValue" DROP COLUMN "isin",
ADD COLUMN     "isin" INTEGER,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER;
