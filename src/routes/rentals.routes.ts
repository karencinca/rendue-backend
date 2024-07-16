import { FastifyInstance } from "fastify";

import RentalsController from "../controllers/rentals.controller";
const rentalsController = new RentalsController()

export async function rentals(app:FastifyInstance) {
    app.get('/', rentalsController.showAll)

    app.get('/:id', rentalsController.showUnique)

    app.post('/', rentalsController.create)

    app.put('/:id', rentalsController.update)

    app.delete('/:id', rentalsController.delete)
}