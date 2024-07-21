import { FastifyInstance } from "fastify";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import UsersController from "../controllers/users.controller";
const usersController = new UsersController()

export async function users(app: FastifyInstance) {
    app.get('/', 
        { preHandler: isAuthenticated },
        usersController.findAll
    )
    
    app.get('/:id', usersController.findById)

    app.post('/register', usersController.create)

    app.post('/login', usersController.login)

    app.put('/:id', usersController.update)

    app.delete('/:id', usersController.delete)
}