class ManagerDb{
    constructor(db){
        this.db = db
    }

    async saveElement(newElem){
        return await this.db.create(newElem)
    }

    async findElements(){
        return await this.db.find().lean()
    }

    async findElementsByQuery(queryCli){
        
        if(!queryCli){
            return await this.db.find().lean()
        } else {
            return await this.db.find(queryCli).lean()
        }
    }

    async findElementById(id){
        return await this.db.findOne({ _id: id }).lean()
    }

    async replaceElement(id, newValues){
        return await this.db.replaceOne({ _id: id }, newValues )
    }

    async updateElement(id, newValues){
        return await this.db.updateOne({ _id: id }, newValues )
    }

    async sortElements(value){
        return await this.db.find().sort( value )
    }

    async deleteElement(id){
        return await this.db.deleteOne({ _id: id })
    }

    async reset(){
        return await this.db.deleteMany({})
    }
};

export default ManagerDb;