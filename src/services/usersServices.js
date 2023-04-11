import User from "../entities/User.js";
import { userDbManager } from "../dao/managersDB/UserDbManager.js";

class UsersServices{

    async saveUser(data){

        const newUser = new User(data)
        await userDbManager.saveElement(newUser)
        return newUser
    }

    async getUserByQuery(query){
        return await userDbManager.findElementsByQuery(query)
    }

    async getAField(param1, param2){
        return await userDbManager.findElementByProjection(param1, param2)
    }
};

const usersServices = new UsersServices();

export default usersServices;
