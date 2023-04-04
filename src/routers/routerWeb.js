import { Router } from 'express';
import { contrShowAllproducts, contrShowProdByPaginate, contrShowCart, publicAccess, privateAccess } from '../controllers/controllersWeb.js';

const routerWeb = Router();

routerWeb.get('/products', contrShowAllproducts)

routerWeb.get('/products', contrShowProdByPaginate)

routerWeb.get('/realtimeproducts', async (req, res) => { res.render('realTimeProducts') })

routerWeb.get('/addProducts', async (req, res) => { res.render('addProducts') })

routerWeb.get('/chat', async (req, res) => {res.render('chat')})

routerWeb.get('/chat', (req, res) => { res.redirect('/chat') })

routerWeb.get('/cart/:cid', contrShowCart)

routerWeb.get('/register', publicAccess, (req, res) => {
    res.render('register')
});

routerWeb.get('/login', publicAccess, (req, res) => {
    res.render('login')
});

routerWeb.get('/', privateAccess, (req, res) => {
    res.render('profile', {
        user: JSON.stringify(req.session.user)
    })
});

export default routerWeb;