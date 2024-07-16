import { prisma } from "../database/prisma-client";
import bcrypt from "bcrypt";
import { sign } from "../plugins/jwt";

class UsersController {
    async showAll(req, reply) {
        const users = await prisma.user.findMany({
            include: {
                properties: {
                    select: {
                        name: true,
                        address: true,
                        description: true
                    }
                },
                tenants: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                rentals: {
                    select: {
                        property: {
                            select: {
                                name: true
                            }
                        },
                        tenant: {
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
        reply.send(users)
    }

    async showUnique(req, reply) {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                properties: true,
                tenants: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
        })
        reply.send(user)
    }

    async create(req, reply) {
        const { name, email, password } = req.body
        
        const passwordHash = bcrypt.hashSync(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash
            }
        })
        reply.send(user)
    }

    async login(req, reply) {
        const { email, password } = req.body
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            return reply.status(401).send({ message: 'Email or password incorrect'})
        }

        const isSamePassword = bcrypt.compareSync(password, user.password)

        if (!isSamePassword) {
            return reply.status(401).send({ message: 'Email or password incorrect'})
        }

        const token = await sign({
            id: user.id,
            name: user.name,
            email: user.email
        })

        return reply.status(200).send({
            message: 'Successful authenticated',
            token: token
        })
    }

    async update(req, reply) {
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
    }

    async delete(req, reply) {
        const { id } = req.params

        const user = await prisma.user.delete({
            where: { id }
        })

        reply.code(200)
    }
}

export default UsersController