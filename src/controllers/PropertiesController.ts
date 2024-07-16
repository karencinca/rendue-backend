import { prisma } from '../database/prisma-client';

class PropertiesController {
    async showAll(req, reply) {
        const properties = await prisma.property.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                rentals: {
                    include: {
                        tenant: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                tenants: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
        reply.send(properties)
    }

    async showUnique(req, reply) {
        const { id } = req.params
        const property = await prisma.property.findUnique({
            where: {
                id, 
            },
            include: {
                user: true,
            }
        })
        reply.send(property)
    }

    async create(req, reply) {
        const { name, address, description, userId } = req.body
        const image = req.file.path
        const property = await prisma.property.create({
            data: {
                name,
                address,
                description,
                image,
                userId
            }
        })
        reply.send(property)
    }

    async update(req, reply) {
        const { id } = req.params
        const { name, address, description, image, userId } = req.body

        const property = await prisma.property.findUnique({
            where: { id }
        })

        if (!property) {
            reply.code(404).send('Property not found')
        }

        const updateProperty = await prisma.property.update({
            where: {
                id
            },
            data: {
                name: name || property?.name,
                address: address || property?.address,
                description: description || property?.description,
                image: image || property?.image,
                userId: userId || property?.userId
            }
        })

        reply.send(updateProperty)
    }

    async delete(req, reply) {
        const { id } = req.params

        const property = await prisma.property.delete({
            where: { id }
        })
        reply.code(200)
    }
}

export default PropertiesController