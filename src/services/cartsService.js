import { productsService } from "../controllers/controllersProducts.js";
import { CartDbManager } from "../dao/managersDB/CartDbManager.js";
import Cart from "../models/Cart.js";

class CartsService{

    
    async createCart(newCart){
        return await CartDbManager.saveElement(newCart)
    };


    async loadProductInCart(cid, data){

        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }
        
        if(!data || data === []){ throw new Error("Sent an invalidate value") }

        cartInDb.productsCart = data
        
        return await CartDbManager.replaceElement(cid, cartInDb)
    };


    async getCartById(cid){
        return await CartDbManager.findElementById(cid)
    };


    async addToCart(cid, pid){

        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        if(cartInDb.productsCart.find(prod => prod.id === pid)){

            const indexProd = cartInDb.productsCart.findIndex(prod => prod.id === pid)
            cartInDb.productsCart[indexProd].quantity = cartInDb.productsCart[indexProd].quantity + 1 

        } else{
            cartInDb.productsCart.push({id: pid, quantity: 1})
        }

        await CartDbManager.replaceElement(cid, cartInDb)
    };


    async updateProdInCart(cid, pid, newQuantity){

        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        if(cartInDb.productsCart.find(prod => prod.id === pid)){

            const indexProd = cartInDb.productsCart.findIndex(prod => prod.id === pid)
            cartInDb.productsCart[indexProd].quantity = newQuantity
            await CartDbManager.replaceElement(cid, cartInDb)

        } else{
            throw new Error("Product not existing in the cart")
        }
    };


    async delProdInCart(cid, pid){

        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        if(cartInDb.productsCart.find(prod => prod.id === pid)){

            const newCartInDb = cartInDb.productsCart.filter(prod => prod.id != pid)
            await CartDbManager.replaceElement(cid, newCartInDb)

        } else{
            throw new Error("Product in cart not found")
        }

    };


    async deleteAllProducts(cid){
        
        const cartInDb = await CartDbManager.findElementById(cid)
        if(!cartInDb){ throw new Error("Cart not existing") }

        cartInDb.productsCart = []
        await CartDbManager.replaceElement(cid, cartInDb)
    };

};

export default CartsService;