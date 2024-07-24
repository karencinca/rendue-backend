import { prisma } from "../database/prisma-client";
import { Rental, RentalCreate, RentalRepository, RentalUpdate } from "../interfaces/rental.interface";

class RentalRepositoryPrisma implements RentalRepository {
    async create(data: RentalCreate): Promise<Rental> {
        const { checkin, checkout, tenantId, propertyId, userId } = data
        const rental = await prisma.rental.create({
            data: {
                checkin,
                checkout,
                tenantId,
                propertyId,
                userId
            }
        })
        return rental
    }

    async findAll(): Promise<Rental[]> {
        const rentals = await prisma.rental.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                },
                tenant: {
                    select: {
                        name: true
                    }
                },
                property: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return rentals
    }

    async findById(id: string): Promise<Rental | null> {
        const rental = await prisma.rental.findUnique({
            where: { id },
            include: {
                tenant: {
                    select: {
                        name: true
                    }
                },
                property: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return rental
    }

    async update(id: string, data: RentalUpdate): Promise<Rental | null> {
        const rental = await prisma.rental.findUnique({
            where: { id }
        })

        const updatedRental = await prisma.rental.update({
            where: { id },
            data: {
                checkin: data.checkin || rental?.checkin,
                checkout: data.checkout || rental?.checkout,
                propertyId: data.propertyId || rental?.propertyId
            }
        })
        return updatedRental
    }

    async delete(id: string): Promise<void> {
        const rental = await prisma.rental.delete({
            where: { id }
        })
    }
}

export default RentalRepositoryPrisma