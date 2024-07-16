import { FastifyInstance, fastify } from 'fastify';

import multer from 'fastify-multer';
import { routes } from './routes';

export const app: FastifyInstance = fastify()

app.register(multer.contentParser)

app.register(routes)

app.listen({
    port: 3333,
},
    () => console.log(`Server is running on port 3333`)
)