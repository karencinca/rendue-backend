import { FastifyInstance } from "fastify";

import TenantsController from "../controllers/tenants.controller";
const tenantsController = new TenantsController()

export async function tenants(app:FastifyInstance) {
    app.get('/', tenantsController.findAll)

    app.get('/:id', tenantsController.findById)

    app.post('/', tenantsController.create)

    app.put('/:id', tenantsController.update)

    app.delete('/:id', tenantsController.delete)
}