import multer from 'fastify-multer';

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-'
        cb(null, data + file.originalname )
    }
})

export const upload = multer({ storage: storage })