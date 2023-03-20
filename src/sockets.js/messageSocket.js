import { MessageDbManager } from "../dao/managersDB/MessageDbManager.js";
import Message from "../models/Message.js";
import MessageServices from "../services/messagesService.js";

const messageServices = new MessageServices;

export function configNewUser(io, socket){
    socket.on('newUser', name => {
        socket.broadcast.emit('newUser', name)
    })

    socket.on('newMessage', async data => {
        messageServices.addMessage(data)
        io.sockets.emit('messages', (await MessageDbManager.findElements()))
    })

    socket.on('refreshMessages', async () => {
        io.sockets.emit('messages', (await MessageDbManager.findElements()))
    })
}