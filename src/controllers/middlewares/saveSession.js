import { sessions } from "../../main.js";

export const saveSession = (req, res, next) => {
    //si tiene un id en las cookies, busco la sesion, sino sigo
    const idSession = req.signedCookies?.idSesion
    if(!idSession) return next()

    //si no encuentro una sesion asociada a ese id, sigo
    const session = sessions[idSession]
    if(!session) return next()

    //Si encontre una session asociada la cargo y aumento el counter de visitas
    req.session = session
    req.session.visits++
    next()
};

