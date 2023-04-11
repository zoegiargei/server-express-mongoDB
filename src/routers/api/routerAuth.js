import { Router } from "express";
import { contrRegister, contrLogin, contrLogout, controGetCurrent } from "../../controllers/api/controllersSession.js";
import passport from "passport";
import { authenticationByGithub, authenticationByGithub_CB } from "../../middlewares/passport.js";
import { authJwtApi } from "../../middlewares/authJwtApi.js";
import { authJwtWeb } from "../../middlewares/authJwtWeb.js";

const routerAuth = Router();


routerAuth.post('/register', contrRegister);

routerAuth.post('/login', passport.authenticate('login', { failWithError:true }), contrLogin);

routerAuth.get('/github', authenticationByGithub);
routerAuth.get('/githubcallback', authenticationByGithub_CB, (req, res, next) => {
    res.redirect('/web/')
});

routerAuth.get('/current', authJwtApi, controGetCurrent)

routerAuth.post('/logout', contrLogout)


export default routerAuth;