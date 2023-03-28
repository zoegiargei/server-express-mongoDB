import { productsManager } from "../main.js";
import { ProductDbManager } from "../dao/managersDB/ProductDbManager.js";
import Product from "../models/Product.js";
import ProductsService from "../services/productsService.js";

export const productsService = new ProductsService();

export const contrGetProd = async (req, res) => {

    try {

        const pid = req.params.pid
        const product = await ProductDbManager.findElementById(pid)
    
        res.json({ product })
        
    } catch (error) {
        res.status(400).send({ msg: "Product not existing" })
    }
};


export const contrGetProducts = async (req, res) => {

    try {

        const limit = req.query.limit || 10
        const valueStock = req.query.stock
        const page = req.query.page || 1
        const sort = req.query.sort
        const queryCli = req.query.queryCli

        const allProducts = (await productsService.getProducts()).slice(0, limit)

        if (valueStock) {

            try {

                const prodsByStock = await productsService.getProductsByQuery({stock: {$eq: 200}})
                return res.json({ prodsByStock })
                
            } catch (error) {
                res.status(400).send({ msg: "There is not product with that stock" })
            }

        } else if (page) {

            try {

                const productsByPage = await productsService.productsByPaginate(limit, page)
                return res.json({ productsByPage })

            } catch (error) {
                res.status(400).send({ msg: "There is not that number page" })
            }

        } else if (sort) {

            const sortedProducts = await productsService.sortAndShowElements(sort)
            return res.json({ sortedProducts })

        } else if (queryCli) {
            
            try {
            
                const prodByQuery = await productsService.findElements({ queryCli })
                return res.json({ prodByQuery })

            } catch (error) {
                res.status(400).send({ msg: "Sent a invalidate query" })
            }
        }

        return res.json({ allProducts })

    } catch (error) {
        res.status(400).send({ msg: "Is not possible show the products" })
    }
};


export const contrPostProd = async (req, res) => {

    try {

        const data = req.body;
        const savedProduct = await productsService.loadProduct(data)

        const allProducts = await ProductDbManager.findElements()
        req['io'].sockets.emit('updateView', allProducts)

        res.status(201).json({ savedProduct });

    } catch (error) {

        res.status(400).json({ msg: "the product was not saved" });
    }
};


export const contrPutProd = async (req, res) => {

    try {

        const pid = req.params.pid;
        const data = req.body;

        await productsService.updateProduct(pid, data)
        res.send({ status: "success", message: "Product updated" });

    } catch (error) {
        res.status(400).send({ msg: "The product was not updated" });
    }
};


export const contrDelProd = async (req, res) => {
    try {
        
        const pid = req.params.pid
        
        await ProductDbManager.deleteElement(pid)
        return res.send({ status: "success", message: "Product deleted" })

    } catch (error) {

        return res.status(400).json({ msg: "The product was not deleted" })
    }
};