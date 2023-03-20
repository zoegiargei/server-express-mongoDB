import { io } from "../../main.js";

function addToReq(req, res, next){
    req.allProducts = []
    req['io'] = io
    next()
}

export default addToReq;