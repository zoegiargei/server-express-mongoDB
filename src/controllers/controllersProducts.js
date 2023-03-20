import { productsManager } from "../main.js";
import { ProductDbManager } from "../dao/managersDB/ProductDbManager.js";
import Product from "../models/Product.js";
import ProductsService from "../services/productsService.js";

export const productsService = new ProductsService();

export const contrGetProd = async (req, res) => {
    
    const pid = req.params.pid
    //const product = await productsManager.getElementByIdentifier(searchedId);
    const product = await ProductDbManager.findElementById(pid)

    res.json({ product })
};


export const contrGetProducts = async (req, res) => {

    try {

        const limit = req.query.limit
        const stock = parseInt(req.query.stock)
        //const allProducts = await productsManager.getElements();
        //const allProducts = await ProductDbManager.findElements()
        const allProducts = await productsService.getProducts()
    
        if (limit) {
    
            const productsSlice = allProducts.slice(0, limit)
            return res.json({ productsSlice })
        }
    
        if (stock) {
            const productsByStock = await productsManager.getElements({ field: 'stock', value: stock })
            return res.json({ productsByStock })
        }
    
        return res.json({ allProducts })

    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
};


export const contrPostProd = async (req, res) => {

    try {

        const data = req.body;
        const newProduct = new Product(data);

        //const savedProduct = await productsManager.addElement(data);
        //const savedProduct = await ProductDbManager.saveElement(newProduct)
        const savedProduct = await productsService.loadProduct(newProduct)

        //products in real time
        //const allProducts = await productsManager.getElements()
        const allProducts = await ProductDbManager.findElements()
        req['io'].sockets.emit('updateView', allProducts)
        //

        res.status(201).json({ savedProduct });

    } catch (error) {

        res.status(400).json({ msg: error.message });
    }
};


export const contrPutProd = async (req, res) => {

    try {

        const pid = req.params.pid;
        const data = req.body;

        //await productsManager.modifyElement(pid, data)
        await ProductDbManager.modifyElement(pid, data)

        res.send({ status: "success", message: "Product updated" });

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};


export const contrDelProd = async (req, res) => {
    try {
        
        const pid = req.params.pid
        //productsManager.deleteElement(pid)
        ProductDbManager.deleteElement(pid)
        return res.send({ status: "success", message: "Product deleted" })

    } catch (error) {

        return res.status(400).json({ msg: error.message })
    }
};