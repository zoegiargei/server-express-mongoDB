import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'
//import { Strategy as GithubStrategy } from 'passport-github2'
//import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import UsersServices from "../services/usersServices.js";
import { isValidPassword } from "../main.js";
import { AuthentiationFailed } from "../entities/errors/AuthenticationFailed.js";
//import User from "../entities/User.js";


export const usersServices = new UsersServices();

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async ( username, password, done ) => {


    if(username === "adminCoder@coder.com" && password === "adminCod3r123"){
        console.log('Es usuario admin')
        const userAdmin = {
            name: 'User Admin',
            email: 'adminCoder@coder.com',
            role: 'Admin'
        }

        return done(null, userAdmin)
    }

    const user = await usersServices.getUserByQuery({ email: username })

    if(!user || user.length === 0){
        console.log('User not existing')
        return done(new AuthentiationFailed())
    }

    user.forEach(field => {
            
        const isValidatePassword = isValidPassword(field.password, password)
        
        if(!isValidatePassword){
            return done(new AuthentiationFailed())
        }
    })

    return done(null, user[0])

}));


/* passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)

    let user
    try {
        
        user = await usersServices.getUserByQuery({ email: profile.username })

    } catch (error) {

        user = new User({
            email: profile.username,
        })

        await usersManager.guardar(user)
    }

    done(null, user)
})); */


//Configuraciones que "copiamos y pegamos", que tenemos que agregar para que funcione passport
passport.serializeUser((user, next) => { next(null, user) });
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();

// estos son para cargar como middlewares antes de los controladores correspondientes
//export const autenticacionUserPass = passport.authenticate('local', { failWithError: true })
//export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
//export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })