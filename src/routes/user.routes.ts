import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/users.interface";

export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase()
    fastify.post<{Body: UserCreate}>('/', async (request, reply) => {
        const { name, email, password } = request.body
        try {
            const data = await userUseCase.create({
                name,
                email,
                password
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.get('/', (request, reply) => {
        reply.send({ hello: 'world '})
    })
}