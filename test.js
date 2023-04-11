const value = {}
console.log(typeof(value))


//proof of cookies & session
import { app } from "./src/main.js";

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
//