import TenantUseCase from "../usecases/tenant.usecase";

const tenantUseCase = new TenantUseCase()
class TenantsController {
    async findAll(req: any, reply: any) {
        const tenants = await tenantUseCase.findAll()
        reply.send(tenants)
    }

    async findById(req: any, reply: any) {
        const { id } = req.params
        const tenant = await tenantUseCase.findById(id)
        reply.send(tenant)
    }

    async create(req: any, reply: any) {
        const { name, email, userId } = req.body
        const data = await tenantUseCase.create({
            name,
            email,
            userId
        })
        return reply.code(200).send(data)
    }

    async update(req: any, reply: any) {
        const { id } = req.params
        const { name, email } = req.body
        const tenant = await tenantUseCase.update(id, {
            name,
            email
        })
        return reply.code(200).send(tenant)
    }

    async delete(req: any, reply: any) {
        const { id } = req.params
        const tenant = await tenantUseCase.delete(id)
        reply.code(200)
    }
}

export default TenantsController