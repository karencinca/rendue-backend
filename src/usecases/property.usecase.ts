import { Property, PropertyCreate, PropertyRepository } from "../interfaces/properties.interface";
import { UserRepository } from "../interfaces/users.interface";
import { PropertiesRepositoryPrisma } from "../repositories/properties.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class PropertyUseCase {
    private propertyRepository: PropertyRepository
    private userRepository: UserRepository
    constructor() {
        this.propertyRepository = new PropertiesRepositoryPrisma()
        this.userRepository = new UserRepositoryPrisma
    }

    async create({name, address, description, image, userEmail}:PropertyCreate) {
        const user = await this.userRepository.findByEmail(userEmail)
        if (!user) {
            throw new Error("User not found")
        }

        const property = await this.propertyRepository.create({
            name,
            address,
            description,
            image,
            userId: user.id
        })

        return property
    }

    async listAllProperties(userEmail: string) {
        const user = await this.userRepository.findByEmail(userEmail)

        if (!user) {
            throw new Error('User not found')
        }

        const properties = await this.propertyRepository.findAllProperties(user.id)
        return properties
    }

    async updateProperty({ id, name, address, description, image}: Property) {
        const data = await this.propertyRepository.updateProperty({
            id, 
            name, 
            address, 
            description, 
            image
        })
        return data
    }

    async delete(id: string) {
        const data = await this.propertyRepository.delete(id)
        return data
    }
}

export { PropertyUseCase }