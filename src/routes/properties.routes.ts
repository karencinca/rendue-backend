import { FastifyInstance } from 'fastify';
import multer from 'fastify-multer';

import PropertiesController from '../controllers/PropertiesController';
const propertiesController = new PropertiesController()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-'
        cb(null, data + file.originalname )
    }
})

const upload = multer({ storage: storage })

export async function properties(app:FastifyInstance) {
    app.get('/', propertiesController.showAll)

    app.get('/:id', propertiesController.showUnique)

    app.post(
        '/', 
        { preHandler: upload.single('image') }, 
        propertiesController.create
    )

    app.put('/:id', propertiesController.update)

    app.delete('/:id', propertiesController.delete)
}