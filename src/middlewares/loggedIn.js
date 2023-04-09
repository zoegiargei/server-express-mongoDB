import { PermissionsFailed } from "../entities/errors/PermissionsFailed.js";

export const loggedIn = (req, res, next) => {
    if(!req.user){ //cambie req.session.user por req.user
        return (new PermissionsFailed())
    }
    next()
};