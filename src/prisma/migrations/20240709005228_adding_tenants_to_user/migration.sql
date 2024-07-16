/*
  Warnings:

  - You are about to drop the `_PropertyToTenant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `rentals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PropertyToTenant" DROP CONSTRAINT "_PropertyToTenant_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyToTenant" DROP CONSTRAINT "_PropertyToTenant_B_fkey";

-- AlterTable
ALTER TABLE "rentals" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PropertyToTenant";

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
