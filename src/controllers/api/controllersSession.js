import { usersServices } from "../../middlewares/passport.js"


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

    } catch (error) {
        return res.status(401).send({ message: error.message })
    }
};


export async function contrLogin (req, res, next){
    res.sendStatus(201)
};


export async function contrLogout (req, res) {

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