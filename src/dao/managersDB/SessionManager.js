import ManagerDb from "./ManagerDb.js";
import { sessionModel } from "../models/session.mode.js";

export const SessionDbManager = new ManagerDb(sessionModel);