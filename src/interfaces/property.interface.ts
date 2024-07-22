export interface Property {
    id: string,
    name: string,
    address: string,
    description: string,
    image: string,
    userId: string,
    createdAt:Date,
    updatedAt: Date
}

export interface PropertyCreate {
    name: string,
    address: string,
    description: string,
    image: string,
    userId: string
}

export interface PropertyUpdate {
    name?: string,
    address?: string,
    description?: string,
    image?: string,
}

export interface Properties {
    findAll(): Property[]
}

export interface PropertyRepository {
    create(data: PropertyCreate): Promise<Property>
    findAll(): Promise<Property[]>
    findById(id: string): Promise<Property | null>
    update(id: string, data: PropertyUpdate): Promise<Property | null>
    delete(id: string): Promise<void>
}