import { ProductDbManager } from "../../dao/managersDB/ProductDbManager.js";
import productsService from "../../services/productsService.js";

export const contrGetProd = async (req, res) => {

    try {

        const pid = req.params.pid
        const product = await ProductDbManager.findElementById(pid)
    
        res.json({ product })
        //res.send({ status: "success", message: { product } });
        
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrGetProducts = async (req, res) => {

    try {

        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const valueStock = req.query.stock
        const sort = req.query.sort
        const queryCli = req.query.queryCli
        const cat = req.query.category

        const allProducts = (await productsService.getProducts()).slice(0, limit)


        if (cat) {
            
            try {

                const categoryCli = String(cat)
                const productsByCat = await productsService.getProductsByQuery({ category: categoryCli })
                return res.json({ productsByCat })

            } catch (error) {
                res.status(400).send({ msg: "There is not product with that category" })
            }

        } else if (valueStock) {

            try {

                const prodsByStock = await productsService.getProductsByQuery({stock: {$eq: 200}})
                return res.json({ prodsByStock })
                
            } catch (error) {
                res.status(400).send({ msg: "There is not product with that stock" })
            }

        } else if (page) {

            try {

                const productsByPage = await productsService.productsByPaginate(limit, page)

                const prevLink = productsByPage.hasPrevPage ? `api/products/limit=${limit}&?page=${Number(page)-1}` : null
                const nextLink = productsByPage.hasPrevPage ? `api/products/limit=${limit}&?page=${Number(page)+1}` : null

                return res.status(200).json({ productsByPage, prevLink, nextLink })

            } catch (error) {
                res.status(400).send({ msg: "Cannot show products by paginate" })
            }

        } else if (sort) {

            const sortedProducts = await productsService.sortAndShowElements(sort)
            return res.json({ sortedProducts })

        } else if (queryCli) {
            
            if(typeof(queryCli) != 'object'){ throw new Error("Sent an invalidate query value") }

            try {

                const prodByQuery = await productsService.getProductsByQuery(queryCli)
                return res.json({ prodByQuery })

            } catch (error) {
                res.status(400).send({ msg: "Sent an invalidate query" })
            }
        }

        return res.json({ allProducts })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrPostProd = async (req, res) => {

    try {

        const data = req.body

        const savedProduct = await productsService.loadProduct(data)

        const allProducts = await ProductDbManager.findElements()
        req['io'].sockets.emit('updateView', allProducts)

        res.status(201).json({ savedProduct });

    } catch (error) {

        res.status(400).send({ message: error.message })
    }
};


export const contrPutProd = async (req, res) => {

    try {

        const pid = req.params.pid;
        const data = req.body;

        await productsService.updateProduct(pid, data)
        res.send({ status: "success", message: "Product updated" });

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
};


export const contrDelProd = async (req, res) => {
    try {
        
        const pid = req.params.pid
        
        await ProductDbManager.deleteElement(pid)
        return res.send({ status: "success", message: "Product deleted" })

    } catch (error) {

        res.status(400).send({ message: error.message })
    }
};