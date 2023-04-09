import { Router } from 'express';
import { contrShowAllproducts, contrShowProdByPaginate, contrShowCart, publicAccess } from '../../controllers/web/controllersWeb.js';
import { onlyLoggedIn } from '../../middlewares/onlyLoggedIn.js';


const routerWeb = Router();

routerWeb.get('/products', contrShowAllproducts)

routerWeb.get('/products', contrShowProdByPaginate)

routerWeb.get('/cart/:cid', contrShowCart)

routerWeb.get('/realtimeproducts', async (req, res) => { res.render('realTimeProducts', { title: 'Real Time Products' }) })

routerWeb.get('/addProducts', async (req, res) => { res.render('addProducts', { title: 'Add products to Database' }) })

routerWeb.get('/chat', async (req, res) => {res.render('chat', { title: 'Chat Websocket' })})

//sessions

routerWeb.get('/register', publicAccess, (req, res) => { res.render('register', { title: 'JOIN US' }) });

routerWeb.get('/login', publicAccess, (req, res) => { res.render('login', { title: 'LOG IN' }) });

routerWeb.get('/', onlyLoggedIn, (req, res) => {
    res.render('profile', { title: 'Profile', user: req.user})
});

export default routerWeb;