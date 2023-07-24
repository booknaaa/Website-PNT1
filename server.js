const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const flash = require('connect-flash');
const expressSession = require('express-session');

//const connectisql = require('./server/database/sql');

const connectDB = require('./server/database/User');

const app = express();

dotenv.config( { path : './server/config.env'} )
const PORT = process.env.PORT || 8080

// log requests
//app.use(morgan('dev'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))


// load assets
app.use(express.static('public'))

//load flash
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))

global.loggedIn = null
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})


// load routers
app.use('/', require('./server/routes/router'))
app.use('/admin/datauser', require('./server/routes/router'))
app.use('/register', require('./server/routes/router'))
app.use('/login', require('./server/routes/router'))
app.use('/home', require('./server/routes/router'))
app.use('/admin', require('./server/routes/router'))
app.use('/logout', require('./server/routes/router'))

app.use('/logserver', require('./server/routes/router'))


app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});