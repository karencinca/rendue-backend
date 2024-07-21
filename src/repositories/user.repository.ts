import { prisma } from "../database/prisma-client"
import { User, UserCreate, UserRepository, UserUpdate } from "../interfaces/user.interface"
import bcrypt from "bcrypt";

class UserRepositoryPrisma implements UserRepository {
    async create(data: UserCreate): Promise<User> {
        const passwordHash = bcrypt.hashSync(data.password, 10)
        
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHash
            }
        })
        return user
    }
    
    async findAll() {
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
        return users
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findFirst({
            where: {
                email
            }
        })
        return result || null
    }

    async findById(id: string): Promise<User | null> {
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
        return user
    }

    async update(id: string, data: UserUpdate): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { id }
        })

        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name: data.name || user?.name,
                email: data.email || user?.email,
                password: data.password || user?.password
            }
        })
        return updateUser
    }


    async delete(id: string): Promise<void> {
        const user = await prisma.user.delete({
            where: { id }
        })
    }
}

export default UserRepositoryPrisma