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
        if (user.message.includes('/')) {
            user.name = `${user.name} (${id})`
            io.sockets.emit('command', user)
        } else if (user.message.includes(':')) {
            user.name = `${user.name} (${id})`
            io.sockets.emit('emote', user)
        } else {
            user.name = `${user.name} (${id})`
            io.sockets.emit('chat', user)

        }
    })
})

const chatRouter = require('./routes/chat')

app.use('/', chatRouter)

http.listen(process.env.PORT || 4000, () => console.log(`Listening on Port ${process.env.PORT || 4000}`))