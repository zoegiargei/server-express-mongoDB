import { Router } from 'express';
import routerProducts from './routerProducts.js';
import routerCarts from './routerCarts.js';
import routerSession from './routerSession.js';

const routerApi = Router();

routerApi.use('/products', routerProducts);
routerApi.use('/carts', routerCarts);
routerApi.use('/session', routerSession);

export default routerApi;

