const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const  path = require('path');
const exp = require('constants');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');

const {database} = require('./keys');

//initializations
const app = express();
require('./lib/passport');

//settings
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'), 
    partialsDir: path.join(app.get('views'),'partials'), 
    extname: '.hbs', 
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//Middlewares
app.use(session({
    secret: 'faztmysqlnodemysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Global Variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    app.locals.type = req.type;
    next();
});
global.userActive = null;
global.typeActive = null;
global.userCarrera = null;

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/user',require('./routes/admin'));
app.use('/user',require('./routes/secretary'));
app.use('/user',require('./routes/teacher'));
app.use('/user',require('./routes/student'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Stating Servers
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});


//Configure
var hbs = exphbs.create({});

hbs.handlebars.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
});