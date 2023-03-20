import ManagerDb from "./ManagerDb.js";
import { prodModel } from "../models/prod.model.js";

export const ProductDbManager = new ManagerDb( prodModel );