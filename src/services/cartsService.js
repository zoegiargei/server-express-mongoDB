import { CartDbManager } from "../dao/managersDB/CartDbManager.js";

class CartsService{

    async createCart(newCart){
        await CartDbManager.saveElement(newCart)
        return newCart
    }

    async getCartById(cid){
        console.log(await CartDbManager.findElementById(cid))
        return await CartDbManager.findElementById(cid)
    }

    async addToCart(cid, pid){


        const cartsInDb = await CartDbManager.findElements()

        const cartInDb = await CartDbManager.findElementById(cid)
        console.log(cartInDb)
            
        cartsInDb.forEach( cart =>  {

            if(cart.id === cid){

                if(cart.productsCart.find(prod => prod.id === pid)){
                    
                    const index = cart.productsCart.findIndex(prod => prod.id === pid)
                    const aux = [...cart.productsCart]
                    aux[index].quantity = aux[index].quantity + 1
                    cart.productsCart = aux

                }else{
                    
                    cart.productsCart.push({ id: pid, quantity: 1 })
                }
            }
        })

        await CartDbManager.modifyElement(cid, cartsInDb)
    };
}

export default CartsService;