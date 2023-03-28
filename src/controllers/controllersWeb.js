import { ExpressHandlebars } from "express-handlebars";
import { isObjectIdOrHexString } from "mongoose";
import { productsService } from "./controllersProducts.js";

export const contrShowAllproducts = async (req, res) => {

    const allProducts = await productsService.getProducts()
    const thIsProducts = allProducts.length > 0
    res.render('index', { title: 'Home', thIsProducts: thIsProducts , products: allProducts }) //Si omito la extensión de index.handlebars el render va a ir a buscar archivos .handlebars por el middleware que definimos antes
};

export const contrShowProdByPaginate = async (req, res) => {

    const page = req.query.page || 1
    const allProducts = await productsService.productsByPaginate(1, page)

    const thIsProducts = allProducts['docs'].length > 0
    console.log(thIsProducts)
    const prevLink = allProducts.hasPrevPage ? Number(page)-1 : null
    const nextLink = allProducts.hasPrevPage ? Number(page)+1 : null

    res.render('products', { title: 'Products By Paginate', thIsProducts: thIsProducts, products: allProducts['docs'], prevLink: prevLink, nextLink: nextLink })
}