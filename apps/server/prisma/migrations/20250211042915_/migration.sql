/*
  Warnings:

  - You are about to drop the column `createdAt` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrderAddress` table. All the data in the column will be lost.
  - Added the required column `orderAddressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderAddress" DROP CONSTRAINT "OrderAddress_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderAddressId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "createdAt",
DROP COLUMN "orderId",
DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderAddressId_fkey" FOREIGN KEY ("orderAddressId") REFERENCES "OrderAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
