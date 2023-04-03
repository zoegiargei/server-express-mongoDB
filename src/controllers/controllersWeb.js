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
    console.log(allProducts.docs)
    console.log(allProducts)
    console.log(allProducts.page)
    console.log(allProducts.hasPrevPage)
    console.log(allProducts.hasNextPage)
    console.log(allProducts.nextPage)

    //allProducts.docs.forEach(doc => {})

    //console.log(prevLink)
    //console.log(nextLink)
    const prevLink = allProducts.hasPrevPage? `http://localhost:8080/web/products?page=${allProducts.prevPage}` : null
    const nextLink = allProducts.hasNextPage? `http://localhost:8080/web/products?page=${allProducts.nextPage}` : null
    const numPage = allProducts.page

    res.render('products', { title: 'Products By Paginate', thIsProducts: thIsProducts, products: allProducts['docs'], prevLink: prevLink? prevLink : 'No hay pagina previa', nextLink: nextLink? nextLink : 'No hay pagina siguiente' , numberPage: numPage})
}