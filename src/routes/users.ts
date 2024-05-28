import { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma-client";

export async function users(app: FastifyInstance) {
    app.get('/', async(req, reply) => {
        const users = await prisma.user.findMany()
        reply.send(users)
    })

    app.get('/:id', async(req, reply) => {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        reply.send(user)
    })

    app.post('/', async(req, reply) => {
        const { name, email, password } = req.body
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        reply.send(user)
    })

    app.put('/:id', async(req, reply) => {
        const { id } = req.params
        const {name, email, password} = req.body

        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            reply.code(404).send('User not found')
        }

        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name: name || user?.name,
                email: email || user?.email,
                password: password || user?.password
            }
        })

        reply.send(updateUser)
    })

    app.delete('/:id', async(req, reply) => {
        const { id } = req.params

        const user = await prisma.user.delete({
            where: { id }
        })

        reply.code(200)
    })

}