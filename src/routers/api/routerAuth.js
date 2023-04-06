import { Router } from "express";
import { contrRegister, contrLogin, contrLogout } from "../../controllers/api/controllersSession.js";
import passport from "passport";
import { loggedIn } from "../../controllers/web/controllersWeb.js";

const routerAuth = Router();


routerAuth.post('/register', passport.authenticate('register', { failWithError:true }), contrRegister);

routerAuth.post('/login', loggedIn, passport.authenticate('login', { failWithError:true }), contrLogin);

routerAuth.post('/logout', contrLogout)


export default routerAuth;