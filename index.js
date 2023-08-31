const express = require('express');
const port = 8000;

const app = express();

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const Session = require('express-session');

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
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log("Error Thrown");
    }else{
        console.log(`server is running on port ${port}`);
    }
})