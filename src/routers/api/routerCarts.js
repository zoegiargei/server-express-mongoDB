import { Router } from 'express';
import { contrGetCart, contrProdInCart, contrDelProdInCart, contrPostCart, contrPutProdInCart, contrDelAllProds, contrPutCart } from '../../controllers/api/controllersCarts.js';

const routerCarts = Router();


routerCarts.post('/', contrPostCart)

routerCarts.post('/:cid/products/:pid', contrProdInCart)

routerCarts.get('/:cid', contrGetCart)

routerCarts.put('/:cid/products/:pid', contrPutProdInCart)

routerCarts.put('/:cid', contrPutCart)

routerCarts.delete('/:cid/products/:pid', contrDelProdInCart)

routerCarts.delete('/:cid', contrDelAllProds)

export default routerCarts;