import { Router } from 'express';
import { contrShowAllproducts } from '../controllers/controllersWeb.js';

const routerWeb = Router();

routerWeb.get('/', contrShowAllproducts)

routerWeb.get('/products', async (req, res) => {
    res.render('products')
})

routerWeb.get('/realtimeproducts', async (req, res) => { res.render('realTimeProducts') })

routerWeb.get('/addProducts', async (req, res) => { res.render('addProducts') })

routerWeb.get('/chat', async (req, res) => {res.render('chat')})

routerWeb.get('/', (req, res) => { res.redirect('/chat') })
export default routerWeb;