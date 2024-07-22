import { prisma } from "../database/prisma-client";
import { Tenant, TenantCreate, TenantRepository, TenantUpdate } from "../interfaces/tenant.interface";

class TenantRepositoryPrisma implements TenantRepository {
    async create(data: TenantCreate): Promise<Tenant> {
        const { name, email, userId } = data
        const tenant = await prisma.tenant.create({
            data: {
                name,
                email,
                userId
            }
        })
        return tenant
    }

    async findAll(): Promise<Tenant[]> {
        const tenants = await prisma.tenant.findMany({
            include: {
                rentals: {
                    select: {
                        property: {
                            select: {
                                name: true,
                            }
                        },
                        checkin: true,
                        checkout: true
                    }
                }
            }

        })
        return tenants
    }

    async findByEmail(email: string): Promise<Tenant | null> {
        const tenant = await prisma.tenant.findFirst({
            where: {
                email
            }
        })
        return tenant
    }

    async findById(id: string): Promise<Tenant | null> {
        const tenant = await prisma.tenant.findUnique({
            where: { id },
            include: {
                rentals: {
                    select: {
                        property: {
                            select: {
                                name: true
                            }
                        },
                        checkin: true,
                        checkout: true
                    }
                }
            }
        })
        return tenant
    }

    async update(id: string, data: TenantUpdate): Promise<Tenant> {
        const tenant = await prisma.tenant.findUnique({
            where: { id }
        })

        const updatedTenant = await prisma.tenant.update({
            where: { id },
            data: {
                name: data.name || tenant?.name,
                email: data.email || tenant?.email
            }
        })
        return updatedTenant
    }

    async delete(id: string): Promise<void> {
        const tenant = await prisma.tenant.delete({
            where: { id }
        })
    }
}

export default TenantRepositoryPrisma