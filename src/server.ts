import { FastifyInstance, fastify } from 'fastify';
import { users } from './routes/users';

export const app: FastifyInstance = fastify()

app.register(users, {
    prefix: '/users'
})

app.listen({
    port: 3333,
},
    () => console.log(`Server is running on port 3333`)
)