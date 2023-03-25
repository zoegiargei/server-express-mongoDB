import uuid from "uuid";
class Product{
    constructor({ title, description, code, price, status=true, stock, category, thumbnail }){ //status harcodeado

        function validateString(value){
            if(!value || typeof(value) != 'string'){ throw new Error(`Invalidate value ${value}`) }
            return value
        }

        function validateCode(code){
            if(!code || !Number.isInteger(code)){ throw new Error(`Invalidate value ${code}`) }
            return code
        }

        function validateStringNum(value){
            if(!value || isNaN(value) || !Number.isInteger(value) || Number(value) < 0){ throw new Error(`Invalidate value ${value}`) }
            return value
        }

        function validateBoolean(value){
            if(typeof(value) != 'boolean'){
                throw new Error(`Invalidate value ${value}`)
            }
            return value
        }

        function validateArray(value){
            if(!value || value.length == 0){
                throw new Error((`Invalidate value ${value}`))
            }else{
                value.forEach(elem => {
                    if(typeof(elem) != 'string'){
                        throw new Error((`Invalidate value ${value}`))
                    }
                })
            }
            return value
        }

        this.title = validateString(title),
        this.description = validateString(description),
        this.code = validateCode(code),
        this.price = validateStringNum(price),
        this.status = validateBoolean(status),
        this.stock = validateCode(stock),
        this.category = validateString(category),
        this.thumbnail = validateArray(thumbnail),
        this.id = uuid() //Ver como hacer para que no se actualize id cuando hacemos put
    }
};

export default Product;