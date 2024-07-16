import { FastifyInstance } from "fastify";

import TenantsController from "../controllers/tenantsController";
const tenantsController = new TenantsController()

export async function tenants(app:FastifyInstance) {
    app.get('/', tenantsController.showAll)

    app.get('/:id', tenantsController.showUnique)

    app.post('/', tenantsController.create)

    app.put('/:id', tenantsController.update)

    app.delete('/:id', tenantsController.delete)
}