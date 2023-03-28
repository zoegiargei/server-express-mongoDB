import { ProductDbManager } from "../dao/managersDB/ProductDbManager.js";
import { prodModel } from "../dao/models/prod.model.js";
import Product from "../models/Product.js";

class ProductsService{

    async loadProduct(prod){
        const newProd = new Product(prod);
        return await ProductDbManager.saveElement(newProd)
    }

    async getProducts(){
        return await ProductDbManager.findElements()
    }

    async getProductsByQuery(queryCli){
        return await ProductDbManager.findElementsByQuery(queryCli)
    }

    async getProductById(pid){
        try {
            return await ProductDbManager.findElementById(pid)
        } catch (error) {
            throw new Error("Product not existing")
        }
    }

    async updateProduct(pid, data){

        return await ProductDbManager.updateElement({ _id: pid }, data)
    }

    async sortAndShowElements(value){
        
        const sort = value

        if (!sort || sort != 1 && sort != -1) {
            throw new Error("The sort value only can be 1 or -1")
        } else {
            return await ProductDbManager.sortElements({price: sort})
        }
    }

    async deleteProduct(pid){
        return await ProductDbManager.deleteElement(pid)
    }

    async productsByPaginate(limitValue, pageValue){
        const products = await prodModel.paginate({}, { limit: limitValue, page: pageValue, lean:true })
        return products
    }
};

export default ProductsService;