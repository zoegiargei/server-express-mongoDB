import { Router } from "express";
import { contrRegister, contrLogin, contrLogout } from "../../controllers/api/controllersSession.js";
import passport from "passport";

const routerAuth = Router();


routerAuth.post('/register', contrRegister);

routerAuth.post('/login', passport.authenticate('login', { failWithError:true }), contrLogin);

routerAuth.post('/logout', contrLogout)


export default routerAuth;