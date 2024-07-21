import { FastifyInstance } from 'fastify';
import PropertiesController from '../controllers/properties.controller';
import { upload } from '../configs/upload';
const propertiesController = new PropertiesController()


export async function properties(app:FastifyInstance) {
    app.get('/', propertiesController.findAll)

    app.get('/:id', propertiesController.findById)

    app.post(
        '/', 
        { preHandler: upload.single('image') }, 
        propertiesController.create
    )

    app.put('/:id', propertiesController.update)

    app.delete('/:id', propertiesController.delete)
}