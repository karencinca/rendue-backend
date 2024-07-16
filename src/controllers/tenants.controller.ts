import { prisma } from "../database/prisma-client";

class TenantsController {
    async showAll(req, reply) {
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
        reply.send(tenants)
    }

    async showUnique(req, reply) {
        const { id } = req.params
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
        reply.send(tenant)
    }

    async create(req, reply) {
        const { name, email, userId, propertyId } = req.body
        const tenant = await prisma.tenant.create({
            data: {
                name,
                email,
                userId,
                propertyId
            }
        })
        reply.send(tenant)
    }

    async update(req, reply) {
        const { id } = req.params
        const { name, email, userId } = req.body

        const tenant = await prisma.tenant.findUnique({
            where: { id }
        })

        if (!tenant) {
            reply.code(404).send('Tenant not found')
        }

        const updateTenant = await prisma.tenant.update({
            where: { id },
            data: {
                name: name || tenant?.name,
                email: email || tenant?.email,
                userId: userId || tenant?.userId
            }
        })

        reply.send(updateTenant)
    }

    async delete(req, reply) {
        const { id } = req.params

        const tenant = await prisma.tenant.delete({
            where: { id }
        })
        reply.code(200)
    }
}

export default TenantsController