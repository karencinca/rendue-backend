import { FastifyInstance, fastify } from 'fastify';
import { users } from './routes/users.routes';
import { properties } from './routes/properties.routes';
import { tenants } from './routes/tenants.routes';
import { rentals } from './routes/rentals.routes';
import multer from 'fastify-multer';

export const app: FastifyInstance = fastify()

app.register(multer.contentParser)

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