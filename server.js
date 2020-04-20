// Modules
const socket = require('./modules/socket-io.js/socket')

const
    express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    expressLayouts = require('express-ejs-layouts')

// Routes
const indexRouter = require('./routes')

app
    .set('view engine', 'ejs')
    .set('views', 'views')
    .set('layout', 'layouts/layout')
    .use(expressLayouts)
    .use(express.static('production'))

// socket.io
socket(io)

app.use('/', indexRouter)

http.listen(process.env.PORT || 4000, () => console.log(`Listening on Port ${process.env.PORT || 4000}`))