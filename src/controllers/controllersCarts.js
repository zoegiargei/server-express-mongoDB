//import { cartsManager } from '../main.js';
//import { productsManager }  from '../main.js';

import CartsService from '../services/cartsService.js';
import { productsService } from './controllersProducts.js';
import Cart from "../models/Cart.js";

const cartsService = new CartsService;

export const contrPostCart = async (req, res) => {

    try {

        const newCart = new Cart() 
        const cartInDb = await cartsService.createCart(newCart)
        res.json({ cartInDb })

    } catch (error) {
        res.status(400).send({ msg: "The Cart was not saved" })
    }
};


export const contrGetCart = async (req, res) => {

    try {
        
        const cid = req.params.cid
        const cart = await cartsService.getCartById(cid)
        
        res.json({ cart })

    } catch (error) {
        res.status(400).send({ msg: "Cart not existing" })
    }
};


export const contrProdInCart = async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid
    
        const productById = await productsService.getProductById(pid)
        console.log(productById)


        if(!productById){
            res.status(400).send({status:"error", error:"Product not existing"})
        }
        
        await cartsService.addToCart(cid, pid)
        
        res.send({ status:"success", message:"Product added to cart" })

    } catch (error) {

        console.log(error)
        res.status(400).send({ status:"error", error:"Not possible add Product to Cart" })
    }
};