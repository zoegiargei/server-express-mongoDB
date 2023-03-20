import ManagerDb from "./ManagerDb.js";
import { cartModel } from "../models/cart.model.js"

export const CartDbManager = new ManagerDb( cartModel );