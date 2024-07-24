import { Rental, RentalCreate, RentalRepository, RentalUpdate } from "../interfaces/rental.interface";
import RentalRepositoryPrisma from "../repositories/rental.repository";

class RentalUseCase {
    private rentalRepository: RentalRepository
    constructor() {
        this.rentalRepository = new RentalRepositoryPrisma()
    }

    async create({ checkin, checkout, tenantId, propertyId, userId}: RentalCreate): Promise<Rental> {
        const rental = await this.rentalRepository.create({ checkin, checkout, tenantId, propertyId, userId })
        return rental
        //fazer validações com datas
        //não criar rental para property com data conflitante, por exemplo
    }

    async findAll(): Promise<Rental[]> {
        const rentals = await this.rentalRepository.findAll()
        return rentals
    }

    async findById(id: string): Promise<Rental | null> {
        const rental = await this.rentalRepository.findById(id)
        if(!rental) {
            throw new Error('Rental not found')
        }
        return rental
    }

    async update(id: string, data: RentalUpdate): Promise<Rental> {
        const rental = await this.rentalRepository.update(id, data)
        if(!rental) {
            throw new Error('Rental not found')
        }
        return rental
    }

    async delete(id: string): Promise<void> {
        const rental = await this.rentalRepository.delete(id)
    }
}

export default RentalUseCase