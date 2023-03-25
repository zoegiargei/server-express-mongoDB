import { ProductDbManager } from "../dao/managersDB/ProductDbManager.js";
import Product from "../models/Product.js";

class ProductsService{

    async loadProduct(prod){
        const newProd = new Product(prod);
        return await ProductDbManager.saveElement(newProd)
    }

    async getProducts(){
        return await ProductDbManager.findElements()
    }

    async getProductById(pid){
        return await ProductDbManager.findElementById(pid)
    }

    async updateProduct(pid, data){

        return await ProductDbManager.updateElement({ _id: pid }, data)
    }

    async deleteProduct(pid){
        return await ProductDbManager.deleteElement(pid)
    }
};

export default ProductsService;