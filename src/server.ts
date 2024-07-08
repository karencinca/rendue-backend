import { FastifyInstance, fastify } from 'fastify';
import { users } from './routes/users';
import { properties } from './routes/properties';

export const app: FastifyInstance = fastify()

app.register(users, {
    prefix: '/users'
})

app.register(properties, {
    prefix: '/properties'
})

app.listen({
    port: 3333,
},
    () => console.log(`Server is running on port 3333`)
)