//import passport from "passport"
import usersServices from "../../services/usersServices.js"
//import { AuthentiationFailed } from "../../entities/errors/AuthenticationFailed.js"
import { encrypt } from "../../utils/jwtUtils.js";

export async function contrRegister (req, res, next){
    try {
        
        const { first_name, last_name, email, age, password } = req.body

        const exist = await usersServices.getUserByQuery({ email: email })

        if(exist.length > 0){
            next( new Error("User already exists") )
        };
    
        const user = await usersServices.saveUser({ first_name, last_name, email, age, password })

        // funcion de passport para que el registro ya me deje logueado tambien!
        req.login(user, error => {
            if (error) {
                next( new Error("Login failed") )
            } else {
                res.status(201).json(req.user)
            }
        })

        res.cookie('jwt_authorization', encriptarJWT(user), {
            signed: true,
            httpOnly: true
        })

    } catch (error) {
        return res.status(401).send({ message: error.message })
    }
};


export async function contrLogin (req, res, next){

    res.cookie('jwt_authorization', encrypt(req.user), {
        signed: true,
        httpOnly: true
    })

    res.sendStatus(201)
};


export async function contrLogout (req, res) {

    res.clearCookie('jwt_authorization', {
        signed: true,
        httpOnly: true
    })

    //logout por passport
    //req.logout internamente hace el destroy de la req.session
    req.logout(err => {
        res.sendStatus(200)
    })
};


export const contrAuth = async (req, res) => {
    try {
        
        const usernameInDb = await usersServices.getAField({username: req.user.firs_name}, {username: 1})
        
        if(usernameInDb != [] && usernameInDb != {} && req.auth){
            return next()
        }

    } catch (error) {
        return res.status(401).send('Error of authentication')
    }
};


export const contrPrivate = async (req, res) => {
    console.log(req.user)
    res.send('Si ves esto es por que estas logeado.')
};


export const controGetCurrent = async (req, res) => {
    res.json(req.user)
};