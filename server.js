require('dotenv').config()

const express = require('express');
const server = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
.then(()=>{
    console.log('conectado na base de dados')
    server.emit('pronto');
}).catch(e => console.log(e))

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf')
const {middlewareGlobal, checkCsrfError, crsfMiddleware} = require('./src/middlewares/middleware')

server.use(helmet())
server.use(express.urlencoded({extended: true}));
server.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
    secret: 'lksjalkajflk',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true 
    }
});
server.use(sessionOptions);
server.use(flash());

server.set('views', path.resolve(__dirname, 'src', 'views'));
server.set('view engine', 'ejs')

server.use(csrf())
server.use(middlewareGlobal)
server.use(checkCsrfError);
server.use(crsfMiddleware);
server.use(routes);

server.on('pronto', ()=> {
    server.listen(3500, ()=>{
        console.log('Servidor executando na porta 3500')
    });
})

