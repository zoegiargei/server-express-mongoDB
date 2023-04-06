import { productsService } from "../api/controllersProducts.js";
import { cartsService } from "../api/controllersCarts.js";
import { PORT } from "../../config/server.js";


export const contrShowAllproducts = async (req, res) => {

    const allProducts = await productsService.getProducts()
    const thIsProducts = allProducts.length > 0
    res.render('index', { title: 'Home', thIsProducts: thIsProducts , products: allProducts }) //Si omito la extensión de index.handlebars el render va a ir a buscar archivos .handlebars por el middleware que definimos antes
};


export const contrShowProdByPaginate = async (req, res) => {

    const page = req.query.page || 1
    const allProducts = await productsService.productsByPaginate(1, page)

    const thIsProducts = allProducts['docs'].length > 0
    console.log(allProducts)
    console.log(allProducts.page)
    console.log(allProducts.hasPrevPage)
    console.log(allProducts.hasNextPage)
    console.log(allProducts.nextPage)

    const prevLink = allProducts.hasPrevPage ? `http://localhost:${PORT}/web/products?page=${allProducts.prevPage}` : null
    const nextLink = allProducts.hasNextPage ? `http://localhost:${PORT}/web/products?page=${allProducts.nextPage}` : null
    const numPage = allProducts.page

    res.render('products', { title: 'Products By Paginate', thIsProducts: thIsProducts, products: allProducts['docs'], prevLink: prevLink || false, nextLink: nextLink? nextLink : false , numberPage: numPage})
};


export const contrShowCart = async (req, res) => {

    const cid = req.cid
    const cart = await cartsService.getCartById(cid)
    const thIsProducts = cartsService.length > 0
    const products = cart.productsCart

    res.render('cartId', { title: 'Cart', thIsProducts: thIsProducts, products: products })
};


export const publicAccess = (req, res, next) => {
    if(req.user){ //cambie req.session.user por req.user
        return res.redirect('/web/')
    }
    next()
};


export const privateAccess = (req, res, next) => {
    if(!req.user){ //cambie req.session.user por req.user
        return res.redirect('/web/login')
    }
    next()
};


export const loggedIn = (req, res, next) => {
    if(req.user){ //cambie req.session.user por req.user
        return res.redirect('/web/')
    }
    next()
};


