/* //jwt no necesita passport, ni session

import express from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
//import User from "./entities/User.js";
import usersServices from "./src/services/usersServices.js";

const PRIVATE_KEY = "myprivatekey";

async function encrypt(user){
    const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: '24h' });
    return token
};

async function decrypt(token){
    return new Promise((res, rej) => {
        jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
            if(err){
                rej(err)
            } else {
                res(decoded)
            }
        })
    })
};

function extractToken(req, res, next){
    //token que viene de una cookie, si viene en una cookie tendria que estar firmada
    req['accessToken'] = req.signedCookies['authorization']
    
    //token que viene en el headers de la peticion
    //const authHeader = req.headers['authorization']
    //req['accessToken'] = authHeader?.split(' ')[1]

    next()
};

async function auth(req, res, next) {

    if (!req['accessToken']) {
        return res.status(401).json({
            error: 'not authenticated'
        })
    }
  
    try {
        const decoded = await decrypt(req['accessToken'])
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({
            error: 'not authorized'
        })
    }
};

// Database

const users = [];

// server

const app = express();
app.use(express.json());
app.use(express.static('./public'));
app.use(cookieParser('SECRET'));
app.use(extractToken);

// routers
// register

app.post('/register', async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body
  
    const exist = await usersServices.getUserByQuery({ email: email })
    if (exist.length > 0) {
      return res.json({ error: 'User already exists' })
    }

    const user = await usersServices.saveUser({first_name: first_name, last_name: last_name, email: email, age: age, password: password})
  
    const access_token = encrypt(user)
  
    // en este caso, queda en la cookie, no tiene que hacer nada el cliente
    // luego el servidor tiene que extraer el token de la cookie
    // precisa del middleware cookie-parser

    res.cookie('authorization', access_token, { signed: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(201).json(user)
  
    // acá el cliente tiene que extraer y guardar el token por su cuenta, por ejemplo, usando LocalStorage 
    // res.header('authorization', access_token)
    // res.status(201).json(usuario)
  
    // aca tb el cliente tiene que extraer y guardar el token por su cuenta, por ejemplo, usando LocalStorage 
    // res.status(201).json({ access_token })
});

// LOG IN
app.post('/login', async (req, res) => {

    const { email, password } = req.body
  
    const user = await usersServices.getUserByQuery({ email: email })
    if (user.length = 0) {
      return res.json({ error: 'invalid credentials' })
    }
  
    //comparar passwords con bcrypt

    const access_token = encrypt(user)
  
    // en este caso, queda en la cookie, no tiene que hacer nada el cliente
    // luego el servidor tiene que extraer el token de la cookie
    res.cookie('authorization', access_token, { signed: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(201).json(user)
  
    // acá el cliente tiene que extraer y guardar el token por su cuenta, por ejemplo, usando LocalStorage 
    // res.header('authorization', access_token)
    // res.json(usuario)
  
    // aca tb el cliente tiene que extraer y guardar el token por su cuenta, por ejemplo, usando LocalStorage 
    // res.json({ access_token })
});

// DATES
app.get('/dates', auth, async (req, res) => {

    const user = await usersServices.getUserByQuery({ email: req.user.email })
    res.json(user)
})

//listen
const PORT = 3000
const server = app.listen(PORT, () => { console.log(`Servidor escuchando en el puerto ${PORT}`) })

server.on("error", error => console.log(`Error by server: ${error}`)) */