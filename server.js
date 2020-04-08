require('dotenv').config()

const
    express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    expressLayouts = require('express-ejs-layouts')

app
    .set('view engine', 'ejs')
    .set('views', 'views')
    .set('layout', 'layouts/layout')
    .use(expressLayouts)
    .use(express.static('production'))

const indexRouter = require('./routes')

app.use('/', indexRouter)

http.listen(process.env.PORT || 4000, () => console.log(`Listening on Port ${process.env.PORT || 4000}`))