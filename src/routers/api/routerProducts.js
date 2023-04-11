import { Router } from 'express';
import { contrGetProd, contrGetProducts, contrPostProd, contrPutProd, contrDelProd } from '../../controllers/api/controllersProducts.js';
import { formatAlphanumeric } from '../../utils/paramsValidations.js';
//Multer --> librería para subir archivos desde un formulario(cliente)
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })
//

const routerProducts = Router();

//proof
routerProducts.param('pid', async(req,res,next,pid) => {
    try {
        if(!pid){
            next(new Error(`Invalid value of product ID`))
        }
        formatAlphanumeric(pid)
    
    } catch (error) {
        return error
    }
    next()
})

//
routerProducts.get('/:pid', contrGetProd)

routerProducts.get('/', contrGetProducts)

routerProducts.post('/', upload.single('uploaded_thumbnail'), contrPostProd)

routerProducts.put('/:pid', contrPutProd)

routerProducts.delete('/:pid', contrDelProd)


export default routerProducts;