import { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma-client";

export async function tenants(app:FastifyInstance) {
    app.get('/', async(req, reply) => {
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
    })

    app.get('/:id', async(req, reply) => {
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
    })

    app.post('/', async(req, reply) => {
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
    })

    app.put('/:id', async(req, reply) => {
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
    })

    app.delete('/:id', async(req, reply) => {
        const { id } = req.params

        const tenant = await prisma.tenant.delete({
            where: { id }
        })
        reply.code(200)
    })
}