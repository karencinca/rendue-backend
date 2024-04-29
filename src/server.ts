import { FastifyInstance, fastify } from 'fastify';
import { userRoutes } from './routes/user.routes'
import { propertyRoutes } from './routes/property.routes'

const app: FastifyInstance = fastify()

app.register(userRoutes, {
    prefix: '/users'
})

app.register(propertyRoutes, {
    prefix: '/properties'
})

app.listen({
    port: 3333,
},
    () => console.log(`Server is running on port 3333`)
)