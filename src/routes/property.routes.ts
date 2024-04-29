import { FastifyInstance } from "fastify";
import { PropertyUseCase } from "../usecases/property.usecase";
import { Property, PropertyCreate } from "../interfaces/properties.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function propertyRoutes(fastify: FastifyInstance) {
    const propertyUseCase = new PropertyUseCase()
    fastify.addHook('preHandler', authMiddleware)
    fastify.post<{Body: PropertyCreate}>('/', async (request, reply) => {
        const { name, address, description, image } = request.body
        const { emailUser } = request.headers['email']
        try {
            const data = await propertyUseCase.create({
               name,
               address,
               description,
               image,
               userEmail: emailUser
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.get('/', async(request, reply) => {
        const emailUser = request.headers['email']
        try {
            const data = await propertyUseCase.listAllProperties(emailUser)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.put<{ Body: Property, Params: {id: string}}>('/:id', async(request, reply) => {
        const { id } = request.params
        const { name, address, description, image } = request.body
        try {
            const data = await propertyUseCase.updateProperty({
                id,
                name,
                address,
                description,
                image
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.delete<{ Params: {id: string}}>('/:id', async(request, reply) => {
        const { id } = request.params
        try {
            const data = await propertyUseCase.delete(id)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}