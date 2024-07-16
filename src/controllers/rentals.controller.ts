import { prisma } from "../database/prisma-client";

class RentalsController {
    async showAll(req, reply) {
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
    }

    async showUnique(req, reply) {
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
    }

    async create(req, reply) {
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
    }

    async update(req, reply) {
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
    }

    async delete(req, reply) {
        const { id } = req.params

        const rental = await prisma.rental.delete({
            where: { id }
        })
        reply.code(200)
    }
}

export default RentalsController