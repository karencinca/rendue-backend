import { FastifyInstance } from 'fastify';
import { prisma } from '../database/prisma-client';
import multer from 'fastify-multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-'
        cb(null, data + file.originalname )
    }
})

const upload = multer({ storage: storage })

export async function properties(app:FastifyInstance) {
    app.get('/', async(req, reply) => {
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
    })

    app.get('/:id', async(req, reply) => {
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
    })

    app.post(
        '/', 
        { preHandler: upload.single('image') }, 
        async(req, reply) => {
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
    })

    app.put('/:id', async(req, reply) => {
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
    })

    app.delete('/:id', async(req, reply) => {
        const { id } = req.params

        const property = await prisma.property.delete({
            where: { id }
        })
        reply.code(200)
    })
}