const get = require('../../modules/api/drinks')

module.exports = (io) => {
    let
        counter = 0,
        groceries = []

    io.on('connection', socket => {
        const id = counter++

        // A user joins the room
        socket.emit('join', {
            user: 'server',
            message: `You (${id}) joined the chat!`,
        })

        socket.emit('loadGroceries', {
            groceries: groceries,
        })

        socket.broadcast.emit('join', {
            user: 'server',
            message: `Anonymous(${id}) joined the chat!`
        })

        // A user leaves the chat
        socket.on('disconnect', (data) => {
            socket.broadcast.emit('leave', {
                user: 'server',
                message: `Anonymous(${id}) left the chat!`
            })
        })

        socket.on('pickDrink', async (data) => {
            io.sockets.emit('pickDrink', await get.ingredients(data.data.id))
        })

        // Chatting
        socket.on('chat', (user) => {
            if (user.message.includes(':add')) {
                const grocery = user.message.split(':add')[1].substring(1)
                groceries.push(grocery)

                io.sockets.emit('addGrocery', grocery)
            } else {
                user.name = `${user.name} (${id})`
                io.sockets.emit('chat', user)
            }
        })
    })
}