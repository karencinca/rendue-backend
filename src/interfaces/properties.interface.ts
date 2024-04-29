export interface Property {
    id: string,
    name: string,
    address: string,
    description: string,
    image: string,
    userId?: string
}

export interface PropertyCreate {
    name: string,
    address: string,
    description: string,
    image: string,
    userEmail: string
}

export interface PropertyCreateData {
    name: string,
    address: string,
    description: string,
    image: string,
    userId: string
}

export interface PropertyRepository {
    create(data: PropertyCreateData): Promise<Property>
    findAllProperties(userId: string): Promise<Property[]>
    updateProperty({id, name, address, description, image }: Property): Promise<Property>
    delete(id: string): Promise<boolean>
}