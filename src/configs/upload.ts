import multer from 'fastify-multer';
import path from 'path'

const TMP_FOLDER = path.resolve(path.dirname('tmp'))
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'src/uploads')

export const storage = multer.diskStorage({
    destination: UPLOADS_FOLDER,

    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-'
        cb(null, data + file.originalname )
    }
})

export const upload = multer({ storage: storage })