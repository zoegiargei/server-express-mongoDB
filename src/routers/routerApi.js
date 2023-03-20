import { Router } from 'express';
import routerProducts from './routerProducts.js';

const routerApi = Router();

routerApi.use(mistake);
routerApi.use(express.json);
routerApi.use(express.urlencoded({ extended: true }));

routerApi.use(routerProducts)

export default routerApi;

