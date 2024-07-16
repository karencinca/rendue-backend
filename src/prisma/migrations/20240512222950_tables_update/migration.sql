/*
  Warnings:

  - You are about to drop the column `propertyId` on the `tenants` table. All the data in the column will be lost.
  - You are about to drop the column `rentalId` on the `tenants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_propertyId_fkey";

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "propertyId",
DROP COLUMN "rentalId";

-- CreateTable
CREATE TABLE "_PropertyToTenant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToTenant_AB_unique" ON "_PropertyToTenant"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToTenant_B_index" ON "_PropertyToTenant"("B");

-- AddForeignKey
ALTER TABLE "_PropertyToTenant" ADD CONSTRAINT "_PropertyToTenant_A_fkey" FOREIGN KEY ("A") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToTenant" ADD CONSTRAINT "_PropertyToTenant_B_fkey" FOREIGN KEY ("B") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
