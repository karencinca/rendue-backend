import { fastify } from 'fastify';

const server = fastify()

server.get('/', () => {
    return 'hello'
})

server.listen({
    port: 3333
})