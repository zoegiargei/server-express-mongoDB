import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId, JWT_PRIVATE_KEY } from '../config/auth.config.js';
import usersServices from '../services/usersServices.js';
import { isValidPassword } from '../main.js';
import { AuthentiationFailed } from '../entities/errors/AuthenticationFailed.js';
import GithubUser from '../entities/GithubUser.js';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';

passport.use('login', new LocalStrategy({ usernameField: 'email' }, async ( username, password, done ) => {

    if(username === "adminCoder@coder.com" && password === "adminCod3r123"){
        console.log('Es usuario admin')
        const userAdmin = {
            username: 'User Admin',
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


passport.use('github', new GithubStrategy({
    
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl

}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)

    //let user
    const exist = await usersServices.getUserByQuery({ username: profile.username })

    if(exist.length > 0){

        const user = exist[0]
        
        return done(null, user)
    }

    const githubUser = new GithubUser({
        full_name: profile.displayName,
        user_id: profile.id,
        username: profile.username
    })

    return done(null, githubUser)

}));

const cookieExtractor = (req) => {
    let token = null
    if(req && req.signedCookies){
        token = req.signedCookies['jwt_authorization']
    }
    return token
};

passport.use('jwt', new jwtStrategy({

    jwtFromRequest: ExtractJwt.fromExtractors([ cookieExtractor ]),
    secretOrKey: JWT_PRIVATE_KEY

}, async(jwt_payload, done) => {

    try {
        done(null, jwt_payload)
    } catch (error) {
        done(error)
    }

}));


//Configuraciones que "copiamos y pegamos", que tenemos que agregar para que funcione passport
passport.serializeUser((user, next) => { next(null, user) });
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();

// estos son para cargar como middlewares antes de los controladores correspondientes
export const authenticationUserPass = passport.authenticate('local', { failWithError: true })
export const authenticationByGithub = passport.authenticate('github', { scope: ['user:email'] })
export const authenticationByGithub_CB = passport.authenticate('github', { failWithError: true })