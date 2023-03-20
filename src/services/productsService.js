import { ProductDbManager } from "../dao/managersDB/ProductDbManager.js";

class ProductsService{

    async loadProduct(prod){
        return await ProductDbManager.saveElement(prod)
    }

    async getProducts(){
        return await ProductDbManager.findElements()
    }

    async getProductById(pid){
        return await ProductDbManager.findElementById(pid)
    }
}

export default ProductsService;