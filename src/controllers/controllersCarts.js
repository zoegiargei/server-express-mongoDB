//import { cartsManager } from '../main.js';
//import { productsManager }  from '../main.js';

import CartsService from '../services/cartsService.js';
import { productsService } from './controllersProducts.js';
import Cart from "../models/Cart.js";
import { CartDbManager } from '../dao/managersDB/CartDbManager.js';

const cartsService = new CartsService;

export const contrPostCart = async (req, res) => {

    //const newCart = await cartsManager.addCart()

    const newCart = new Cart() 
    cartsService.createCart(newCart)
    res.json({ newCart })
};


export const contrGetCart = async (req, res) => {
    const cid = req.params.cid
    //const cart = await cartsManager.getCartById(cid)
    
    const cart = await cartsService.getCartById(cid)
    
    res.json({ cart })
};


export const contrProdInCart = async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid
    
        //const productById = await productsManager.getElementByIdentifier(pid)
        const productById = await productsService.getProductById(pid)
        console.log(productById)


        //A modo de test
        //console.log(productById)

        if(!productById){
            res.status(400).send({status:"error", error:"Product not existing"})
        }
        
        //await cartsManager.addToCart(cid, pid)
        await cartsService.addToCart(cid, pid)
        res.send({ status:"success", message:"Product added to cart" })

    } catch (error) {

        console.log(error)
        res.status(400).send({ status:"error", error:"Not possible" })
    }
};