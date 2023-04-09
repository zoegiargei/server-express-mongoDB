import { Router } from "express";
import { contrRegister, contrLogin, contrLogout } from "../../controllers/api/controllersSession.js";
import passport from "passport";
import { authenticationByGithub, authenticationByGithub_CB } from "../../middlewares/passport.js";

const routerAuth = Router();


routerAuth.post('/register', contrRegister);

routerAuth.post('/login', passport.authenticate('login', { failWithError:true }), contrLogin);

routerAuth.get('/github', authenticationByGithub);
routerAuth.get('/githubcallback', authenticationByGithub_CB, (req, res, next) => {
    res.redirect('/web/')
});

routerAuth.post('/logout', contrLogout)


export default routerAuth;