class ManagerDb{
    constructor(db){
        this.db = db
    }

    async saveElement(newElem){
        return await this.db.create(newElem)
    }

    async findElements(){
        return await this.db.find()
    }

    async findElementById(id){
        return await this.db.findOne({ id })
    }

    async modifyElement(id, newValues){
        return await this.db.replaceOne({ id }, newValues, {runValidators: true})
    }

    async deleteElement(id){
        return await this.db.deleteOne({ id })
    }

    async reset(){
        return await this.db.deleteMany({})
    }
};

export default ManagerDb;