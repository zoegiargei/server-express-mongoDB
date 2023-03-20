import { MessageDbManager } from "../dao/managersDB/MessageDbManager.js";

class MessageServices{
    async addMessage(mess){
        await MessageDbManager.saveElement(mess)
    }
}

export default MessageServices;