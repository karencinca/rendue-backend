import { Rental, RentalCreate, RentalRepository, RentalUpdate } from "../interfaces/rental.interface";
import RentalRepositoryPrisma from "../repositories/rental.repository";
import { AppError } from "../utils/AppError";

class RentalUseCase {
    private rentalRepository: RentalRepository
    constructor() {
        this.rentalRepository = new RentalRepositoryPrisma()
    }

    async create({ checkin, checkout, tenantId, propertyId, userId}: RentalCreate): Promise<Rental> {
        const rental = await this.rentalRepository.create({ checkin, checkout, tenantId, propertyId, userId })
        return rental
    }

    async findAll(): Promise<Rental[]> {
        const rentals = await this.rentalRepository.findAll()
        return rentals
    }

    async findById(id: string): Promise<Rental | null> {
        const rental = await this.rentalRepository.findById(id)
        if(!rental) {
            throw new AppError('Rental not found')
        }
        return rental
    }

    async update(id: string, data: RentalUpdate): Promise<Rental> {
        const rental = await this.rentalRepository.update(id, data)
        if(!rental) {
            throw new AppError('Rental not found')
        }
        return rental
    }

    async delete(id: string): Promise<void> {
        const rental = await this.rentalRepository.delete(id)
    }
}

export default RentalUseCase