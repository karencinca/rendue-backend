import { prisma } from "../database/prisma-client";
import { Property, PropertyCreate, PropertyCreateData, PropertyRepository } from "../interfaces/properties.interface";

class PropertiesRepositoryPrisma implements PropertyRepository {
    async create(data: PropertyCreateData): Promise<Property> {
        const result = await prisma.properties.create({
            data: {
                name: data.name,
                address: data.address,
                description: data.description,
                image: data.image,
                userId: data.userId
            }
        })
        return result
    }

    async findAllProperties(userId: string): Promise<Property[]> {
        const result = await prisma.properties.findMany({
            where: {
                userId,
            }
        })
        return result
    }

    async updateProperty({ id, name, address, description, image }: Property): Promise<Property> {
        const result = await prisma.properties.update({
            where: {
                id,
            },
            data: {
                name,
                address,
                description,
                image
            }  
        })
        return result
    }

    async delete(id: string): Promise<boolean> {
        const result = await prisma.properties.delete({
            where: {
                id
            }
        })
        return result ? true : false
    }
}

export { PropertiesRepositoryPrisma }