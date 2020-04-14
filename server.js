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

// socket.io
let counter = 0

io.on('connection', socket => {
    const id = counter++

    // A user joins the room
    socket.emit('join', {
        user: 'server',
        message: `You (${id}) joined the chat!`
    })

    socket.broadcast.emit('join', {
        user: 'server',
        message: `Anonymous(${id}) joined the chat!`
    })

    // A user leaves the chat
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', {
            user: 'server',
            message: `Anonymous(${id}) left the chat!`
        })
    })

    // Chatting
    socket.on('chat', (user) => {
        if (user.message.includes(':add')) {
            io.sockets.emit('addGrocery', user)

            console.log(user.message.split(':add')[1].substring(1))

        } else {
            user.name = `${user.name} (${id})`
            io.sockets.emit('chat', user)
        }
    })
})

const indexRouter = require('./routes')

app.use('/', indexRouter)

http.listen(process.env.PORT || 4000, () => console.log(`Listening on Port ${process.env.PORT || 4000}`))