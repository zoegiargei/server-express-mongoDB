import User from "../models/User.js";
import { userDbManager } from "../dao/managersDB/UserDbManager.js";

class UsersServices{

    async saveUser(data){
        console.log(data)

        const newUser = new User(data)
        console.log(newUser)
        
        return await userDbManager.saveElement(newUser)
    }

    async getUserByQuery(query){
        return await userDbManager.findElementsByQuery(query)
    }

    async getAField(param1, param2){
        return await userDbManager.findElementByProjection(param1, param2)
    }
};

export default UsersServices;