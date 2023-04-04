import e, { Router } from "express";
import { contrRegister, contrLogin, contrPrivate, contrLogout } from "../controllers/controllersSession.js";
const routerSession = Router();

routerSession.post('/register', contrRegister)

routerSession.post('/login', contrLogin);

routerSession.get('/logout', contrLogout)

routerSession.get('/private', contrPrivate);

export default routerSession;