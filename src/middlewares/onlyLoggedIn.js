import { PermissionsFailed } from "../entities/errors/PermissionsFailed.js";

export function onlyLoggedInAPI(req, res, next){
    if (!req.isAuthenticated()){
        return next(new PermissionsFailed())
    }
    next()
};

export function onlyLoggedIn(req, res, next){
    //isAuthenticated es un method que me provee passport para ver si hay alguna sesion inicializada por el usuario
    if (!req.isAuthenticated()){
        return res.redirect('/web/login')
    }
    next()
};