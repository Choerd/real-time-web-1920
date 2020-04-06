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

const users = {}

// socket.io
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { name: users[socket.id], message: message })
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

const indexRouter = require('./routes/index')

app.use('/', indexRouter)

http.listen(process.env.PORT || 4000, () => console.log(`Listening on Port ${process.env.PORT || 4000}`))