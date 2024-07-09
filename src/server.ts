import { FastifyInstance, fastify } from 'fastify';
import { users } from './routes/users';
import { properties } from './routes/properties';
import { tenants } from './routes/tenants';
import { rentals } from './routes/rentals';

export const app: FastifyInstance = fastify()

app.register(users, {
    prefix: '/users'
})

app.register(properties, {
    prefix: '/properties'
})

app.register(tenants, {
    prefix: '/tenants'
})

app.register(rentals, {
    prefix: '/rentals'
})

app.listen({
    port: 3333,
},
    () => console.log(`Server is running on port 3333`)
)