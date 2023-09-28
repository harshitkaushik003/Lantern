const express = require('express');
const cors = require('cors');
const port = 8000;

const app = express();



const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const Session = require('express-session');
// const MongoStore = require('connect-mongo')(Session);
const mongoStore = require('connect-mongo')(Session);
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(3000);
console.log("Socket server running on port 3000");

app.use(cors({
    origin: 'http://localhost:8000', // Allow requests from your frontend application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
}));

app.use(express.urlencoded());
app.use(expressLayouts)
app.use(express.static('./assets'));
app.set('layout extractStyles', true);
app.set('layout extractStyles', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(Session({
    name: 'lantern',
    secret: 'one',
    saveUninitialized: false,
    resave:true,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new mongoStore(
    {
        mongooseConnection: db,
        autoRemove: 'disabled',

    },function(err){
        console.log(err || "Connect mongodb setup ok");
    })
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log("Error Thrown");
    }else{
        console.log(`server is running on port ${port}`);
    }
})