import { Property, PropertyCreate, PropertyRepository, PropertyUpdate } from "../interfaces/property.interface"
import PropertyRepositoryPrisma from "../repositories/property.repository"
import { AppError } from "../utils/AppError"

class PropertyUseCase {
    private propertyRepository: PropertyRepository
    constructor() {
        this.propertyRepository = new PropertyRepositoryPrisma()
    }

    async create({name, address, description, image, userId}: PropertyCreate): Promise<Property> {
        const property = await this.propertyRepository.create({ name, address, description, image, userId})
        return property
    }

    async findAll(): Promise<Property[]> {
        const properties = await this.propertyRepository.findAll()
        return properties
    }

    async findById(id: string): Promise<Property | null> {
        const property = await this.propertyRepository.findById(id)
        if (!property) {
            throw new AppError('Property not found')
        }
        return property
    }

    async update(id: string, data: PropertyUpdate): Promise<Property | null> {
        const property = await this.propertyRepository.update(id, data)
        if (!property) {
            throw new AppError('Property not found')
        }
        return property
    }

    async delete(id: string): Promise<void> {
        const property = await this.propertyRepository.delete(id)
    }
}

export default PropertyUseCase