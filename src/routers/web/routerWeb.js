import { Router } from 'express';
import { contrShowAllproducts, contrShowProdByPaginate, contrShowCart, publicAccess } from '../../controllers/web/controllersWeb.js';
import { onlyLoggedIn } from '../../middlewares/onlyLoggedIn.js';


const routerWeb = Router();

routerWeb.get('/products', contrShowAllproducts)

routerWeb.get('/products', contrShowProdByPaginate)

routerWeb.get('/realtimeproducts', async (req, res) => { res.render('realTimeProducts') })

routerWeb.get('/addProducts', async (req, res) => { res.render('addProducts') })

routerWeb.get('/chat', async (req, res) => {res.render('chat')})

routerWeb.get('/chat', (req, res) => { res.redirect('/chat') })

routerWeb.get('/cart/:cid', contrShowCart)

routerWeb.get('/register', publicAccess, (req, res) => { res.render('register') });

routerWeb.get('/login', publicAccess, (req, res) => { res.render('login') });

routerWeb.get('/', onlyLoggedIn, (req, res) => {

    //const user = req.session.user
    const user = req.user
    res.render('profile', { title: 'Profile', user: user})
});

routerWeb.get('/logout', (req, res) => {
    res.redirect('/api/auth/logout')
})

export default routerWeb;