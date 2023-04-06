import passport from "passport";
import { Strategy } from "passport-local";
import UsersServices from "../services/usersServices.js";
import { isValidPassword } from "../main.js";
import { AuthentiationFailed } from "../entities/errors/AuthenticationFailed.js";


/* export function roleSystem(email, password){ //Esto podria ser un middleware con (req, res, next)
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        return "Admin"
    } else {
        return "User"
    }
} */


export const usersServices = new UsersServices();


passport.use('register', new Strategy({ passReqToCallback: true , usernameField: 'email'}, async (req, _u, _p, done) => {

    try {
        
        const { first_name, last_name, email, age, password } = req.body
        const exist = await usersServices.getUserByQuery({ email: email })
    
        exist.forEach(elem => {
            if(elem.email === email){
                throw new Error("User already exists")
            }
        })
    
        const user = await usersServices.saveUser({ first_name, last_name, email, age, password })
        console.log(user)
        done(null, user)

    } catch (error) {
        throw new Error(error.message)
    }
}));

passport.use('login', new Strategy({ passReqToCallback: true , usernameField: 'email'}, async (req, _u, _p, done) => {

    const { email, password } = req.body

    const role = req.role

    if( String(role) === 'User'){
        
        const user = await usersServices.getUserByQuery({ email: email })

        //A modo de prueba
        console.log('user encontrado!!!!')
        console.log(user)

        if(!user || user === [] || user === {}){
            return done(new AuthentiationFailed())
        }
        
        
        user.forEach(field => {
            
            const isValidatePassword = isValidPassword(field.password, password)
            
            if(field.email === email && isValidatePassword){

                req.session.user = {
                    name: `${field.first_name} ${field.last_name}`,
                    email: field.email,
                    age: field.age,
                    role: role
                }
                //mandar user x socket: otra posibilidad, probar!

            } else {
                return done(new AuthentiationFailed())
            }
        })
        
        req.auth = true
        console.log(' REQ.SESSION.USER !!!! ')
        console.log(req.session.user)

        done(null, user)

    } else{

        req.session.user = {
            name:  'Admin user',
            email: 'adminCoder@coder.com',
            role: role
        }

        const user =  {
            name:  'Admin user',
            email: 'adminCoder@coder.com',
            role: role
        }

        done(null, user)

    }


}));

//Configuraciones que "copiamos y pegamos", que tenemos que agregar para que funcione passport
passport.serializeUser((user, next) => { next(null, user) });
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();