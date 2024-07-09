import { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma-client";

export async function rentals(app:FastifyInstance) {
    app.get('/', async(req, reply) => {
        const rentals = await prisma.rental.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                },
                tenant: {
                    select: {
                        name: true
                    }
                },
                property: {
                    select: {
                        name: true
                    }
                }
            }
        })
        reply.send(rentals)
    })

    app.get('/:id', async(req, reply) => {
        const { id } = req.params
        const rental = await prisma.rental.findUnique({
            where: { id },
            include: {
                tenant: {
                    select: {
                        name: true
                    }
                },
                property: {
                    select: {
                        name: true
                    }
                }
            }
        })
        reply.send(rental)
    })

    app.post('/', async(req, reply) => {
        const { checkin, checkout, userId, tenantId, propertyId } = req.body
        const rental = await prisma.rental.create({
            data: {
                checkin,
                checkout,
                userId,
                tenantId,
                propertyId
            }
        })
        reply.send(rental)
    })

    app.put('/:id', async(req, reply) => {
        const { id } = req.params
        const { checkin, checkout, tenantId, propertyId } = req.body

        const rental = await prisma.rental.findUnique({
            where: { id }
        })

        const updateRental = await prisma.tenant.update({
            where: { id },
            data: {
                checkin: checkin || rental?.checkin,
                checkout: checkout || rental?.checkout,
                tenantId: tenantId || rental?.tenantId,
                propertyId: propertyId || rental?.propertyId
            }
        })
        reply.send(updateRental)
    })

    app.delete('/:id', async(req, reply) => {
        const { id } = req.params

        const rental = await prisma.rental.delete({
            where: { id }
        })
        reply.code(200)
    })
}