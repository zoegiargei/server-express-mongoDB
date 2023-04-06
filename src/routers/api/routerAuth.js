import { Router } from "express";
import { contrRegister, contrLogin, contrLogout } from "../../controllers/api/controllersSession.js";
import passport from "passport";
import role from "../../middlewares/role.js";
import { loggedIn } from "../../controllers/web/controllersWeb.js";

const routerAuth = Router();


routerAuth.post('/register', passport.authenticate('register', { failWithError:true, failureRedirect: '/web/register' }), contrRegister);

routerAuth.post('/login', role, loggedIn, passport.authenticate('login', { failWithError:true , failureRedirect: '/web/login' }), contrLogin);

routerAuth.post('/logout', contrLogout)


export default routerAuth;