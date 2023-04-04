import express from 'express';
import Manager from './dao/managers/Manager.js';

import mongoose from 'mongoose';
import { MONGO_CNX_STR, PORT } from './config/server.js';
import MongoStore from 'connect-mongo';

import __dirname from '../utils/utils.js';

import CartsManager from './dao/managers/CartsManager.js';

import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import timeNow from './controllers/middlewares/timeNow.js';
import addToReq from './controllers/middlewares/addToReq.js'
import mistake from './controllers/errors/mistake.js';

import routerApi from './routers/routerApi.js';
import routerWeb from './routers/routerWeb.js';

import { configMessagesSocket } from './sockets/messageSocket.js';

import cookieParser from 'cookie-parser';
import thAreCookies from './controllers/middlewares/thAreCookies.js';
import session from 'express-session';

import showSession from './controllers/middlewares/showSession.js';

//
export const productsManager = new Manager("./fileOfProducts.json");
export const cartsManager = new CartsManager("./fileOfCarts.json");


//
const app = express();

export const sessions = {};

//
mongoose.connect(MONGO_CNX_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))

app.use(timeNow);
app.use(addToReq);
app.use(mistake);

app.use(cookieParser('secretWord'));
app.use(thAreCookies);

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO_CNX_STR,
        ttl: 300 //temporal time life
    }),
    secret: "secretStringForSecurity",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    showSession(req)
    next()
});


//
app.engine('handlebars', engine());
//settings: .set
app.set('views', './views');
app.set('view engine', 'handlebars');


//
app.use('/web', routerWeb);
app.use('/api', routerApi);


//
app.get('/setCookie', (req, res) => {
    res.cookie('cookieDePrueba', 'Esto es lo que contendra la cookie', { maxAgge: 10000, signed:true }).send('Cookie')
});

app.get('/getCookie', (req, res) => {
    console.dir(req.signedCookies)
    res.send(req.signedCookies)
});

app.get('/delCookie', (req, res) => {
    res.clearCookie('cookieDePrueba').send('Cookie Removed')
});


//
app.get('/session', (req, res) => {
    if(req.session.counter) {
        req.session.counter ++
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido nuevo Usuario!')
    }
});


//const port = (process.env.PORT || 8080);
export const HTTPserver = app.listen(PORT, () => {console.log(`Server running on port: ${ PORT }`)});


//
export const io = new Server( HTTPserver );
io.on('connection', async socketSideServer => {

    console.log("nuevo cliente conectado!")

    socketSideServer.on('message', data => {
        console.log(data)
    })

    const allProducts = await productsManager.getElements()
    socketSideServer.emit('allProducts', allProducts)

    socketSideServer.on('newProduct', data => {
        console.log(data)
        productsManager.addElement(data)
    })

    configMessagesSocket(io, socketSideServer)
});
