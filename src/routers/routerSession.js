import e, { Router } from "express";
import { contrRegister, contrLogin, contrPrivate, contrLogout, contrAuth } from "../controllers/controllersSession.js";
const routerSession = Router();

routerSession.post('/register', contrRegister)

routerSession.post('/login', contrLogin);

routerSession.get('/logout', contrLogout) //add contrAuth like proof

routerSession.get('/private', contrAuth, contrPrivate);

export default routerSession;