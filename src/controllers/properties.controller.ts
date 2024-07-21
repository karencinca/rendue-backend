import PropertyUseCase from '../usecases/property.usecase';

const propertyUseCase = new PropertyUseCase()
class PropertiesController {
    async findAll(req: any, reply: any) {
        const properties = await propertyUseCase.findAll()
        return reply.code(200).send(properties)
    }

    async findById(req: any, reply: any) {
        const { id } = req.params
        const property = await propertyUseCase.findById(id)
        return reply.code(200).send(property)
    }

    async create(req: any, reply: any) {
        const { name, address, description, userId } = req.body
        const image = req.file.path
        const property = await propertyUseCase.create({ name, address, description, image, userId })
        return reply.code(200).send(property)
    }

    async update(req: any, reply: any) {
        const { id } = req.params
        const { name, address, description, image } = req.body
        const data = await propertyUseCase.update(id, {
            name,
            address,
            description,
            image
        })
        return reply.code(200).send(data)
    }

    async delete(req: any, reply: any) {
        const { id } = req.params
        const result = await propertyUseCase.delete(id)
    }
}

export default PropertiesController