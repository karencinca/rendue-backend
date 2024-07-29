import { prisma } from "../database/prisma-client";
import { Property, PropertyCreate, PropertyRepository, PropertyUpdate } from "../interfaces/property.interface";

class PropertyRepositoryPrisma implements PropertyRepository {
    async create(data: PropertyCreate): Promise<Property> {
        const { name, address, description, userId, image } = data
        const property = await prisma.property.create({
            data: {
                name,
                address,
                description,
                image,
                userId
            }
        })
        return property
    }

    async findAll(): Promise<Property[]> {
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
                }
            }
        })
        return properties
    }
    
    async findById(id: string): Promise<Property | null> {
        const property = await prisma.property.findFirst({
            where: {
                id
            },
            include: {
                user: true,
            }
        })
        return property
    }

    async update(id: string, data: PropertyUpdate): Promise<Property | null> {
        const property = await prisma.property.findFirst({
            where: {
                id
            }
        })

        const updatedProperty = await prisma.property.update({
            where: {
                id
            },
            data: {
                name: data.name || property?.name,
                address: data.address || property?.address,
                description: data.description || property?.description,
                image: data.image || property?.image,
            }
        })
        return updatedProperty
    }

    async delete(id: string): Promise<void> {
        const property = await prisma.property.delete({
            where: { id }
        })
    }
}

export default PropertyRepositoryPrisma