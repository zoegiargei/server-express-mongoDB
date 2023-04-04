import ManagerDb from "./ManagerDb.js";
import { userModel } from "../models/user.model.js";

export const userDbManager = new ManagerDb(userModel);