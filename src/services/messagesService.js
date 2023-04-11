import { MessageDbManager } from "../dao/managersDB/MessageDbManager.js";

class MessageServices{
    async addMessage(newMess){
        return await MessageDbManager.saveElement(newMess)
    }

    async getMessages(){
        return await MessageDbManager.findElements()
    }
}

const messageServices = new MessageServices();

export default messageServices;