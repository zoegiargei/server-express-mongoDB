import { CartDbManager } from "../dao/managersDB/CartDbManager.js";

class CartsService{

    async createCart(newCart){
        return await CartDbManager.saveElement(newCart)
    };

    async getCartById(cid){

        return await CartDbManager.findElementById(cid)
    };

    async addToCart(cid, pid){

        const cartInDb = await CartDbManager.findElementById(cid)

        if(cartInDb.productsCart.find(prod => prod.id === pid)){
            const indexProd = cartInDb.productsCart.findIndex(prod => prod.id === pid)
            cartInDb.productsCart[indexProd].quantity = cartInDb.productsCart[indexProd].quantity + 1 
        } else{
            cartInDb.productsCart.push({id: pid, quantity: 1})
        }

        await CartDbManager.replaceElement(cid, cartInDb)
    };
};

export default CartsService;