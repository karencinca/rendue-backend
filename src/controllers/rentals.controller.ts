import RentalUseCase from "../usecases/rental.usecase"

const rentalUseCase = new RentalUseCase()

class RentalsController {
    async findAll(req: any, reply: any) {
        const rentals = await rentalUseCase.findAll()
        return reply.code(200).send(rentals)
    }

    async findById(req: any, reply: any) {
        const { id } = req.params
        const rental = await rentalUseCase.findById(id)
        return reply.code(200).send(rental)
    }

    async create(req: any, reply: any) {
        const { checkin, checkout, userId, tenantId, propertyId } = req.body
        const rental = await rentalUseCase.create({ checkin, checkout, userId, tenantId, propertyId })
        return reply.code(200).send(rental)
    }

    async update(req: any, reply: any) {
        const { id } = req.params
        const { checkin, checkout, propertyId } = req.body

        const data = await rentalUseCase.update(id, {
            checkin,
            checkout,
            propertyId
        })
        return reply.code(200).send(data)
    }

    async delete(req: any, reply: any) {
        const { id } = req.params
        const rental = await rentalUseCase.delete(id)
        reply.code(200)
    }
}

export default RentalsController