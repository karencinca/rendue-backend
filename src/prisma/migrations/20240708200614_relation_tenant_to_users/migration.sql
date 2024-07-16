-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_userId_fkey";

-- CreateTable
CREATE TABLE "_TenantToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TenantToUser_AB_unique" ON "_TenantToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TenantToUser_B_index" ON "_TenantToUser"("B");

-- AddForeignKey
ALTER TABLE "_TenantToUser" ADD CONSTRAINT "_TenantToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TenantToUser" ADD CONSTRAINT "_TenantToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
