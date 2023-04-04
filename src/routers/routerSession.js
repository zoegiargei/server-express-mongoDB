import e, { Router } from "express";
import { contrRegister, contrAuth, contrLogin, contrPrivate } from "../controllers/controllersSession.js";
const routerSession = Router();

routerSession.post('/register', contrRegister)

routerSession.post('/login', contrLogin);

routerSession.get('/private', contrAuth, contrPrivate);

export default routerSession;