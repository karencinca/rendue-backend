/*
  Warnings:

  - You are about to drop the `_TenantToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TenantToUser" DROP CONSTRAINT "_TenantToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TenantToUser" DROP CONSTRAINT "_TenantToUser_B_fkey";

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TenantToUser";

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
