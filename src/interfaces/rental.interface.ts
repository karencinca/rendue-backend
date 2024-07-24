export interface Rental {
    id: string,
    checkin: Date,
    checkout: Date,
    tenantId: string,
    propertyId: string,
    userId: string
}

export interface RentalCreate {
    checkin: Date,
    checkout: Date,
    tenantId: string,
    propertyId: string,
    userId: string
}

export interface RentalUpdate {
    checkin?: Date,
    checkout?: Date,
    propertyId?: string
}

export interface Rentals {
    findAll: Rental[]
}

export interface RentalRepository {
    create(data: RentalCreate): Promise<Rental>
    findAll(): Promise<Rental[]>
    findById(id: string): Promise<Rental | null>
    update(id: string, data: RentalUpdate): Promise<Rental | null>
    delete(id: string): Promise<void>
}