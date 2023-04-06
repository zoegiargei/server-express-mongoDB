import e, { Router } from "express";
import { contrPrivate, contrAuth } from "../../controllers/api/controllersSession.js";

const routerSession = Router();

routerSession.get('/private', contrAuth, contrPrivate);

export default routerSession;