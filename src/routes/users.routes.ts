import { FastifyInstance } from "fastify";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import UsersController from "../controllers/usersController";
const usersController = new UsersController()

export async function users(app: FastifyInstance) {
    app.get('/', 
        { preHandler: isAuthenticated },
        usersController.showAll
    )
    
    app.get('/:id', usersController.showUnique)

    app.post('/register', usersController.create)

    app.post('/login', usersController.login)

    app.put('/:id', usersController.update)

    app.delete('/:id', usersController.delete)
}