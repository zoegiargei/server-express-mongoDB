import ManagerDb from "./ManagerDb.js";
import { messageModel } from "../models/message.model.js"

export const MessageDbManager = new ManagerDb( messageModel );