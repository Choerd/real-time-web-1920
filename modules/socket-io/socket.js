const get = require('../api/drinks')

module.exports = (io) => {
    let
        counter = 0,
        groceries = ["Banaan", "Appel", "Peer"]

    io.on('connection', socket => {
        const id = counter++

        // A user joins the room
        socket.emit('join', {
            chat: {
                user: 'server',
                message: `You (${id}) joined the chat!`
            },
            grocerylist: {
                groceries: groceries
            }
        })

        socket.broadcast.emit('joined', {
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

        socket.on('chat', (user) => {
            user.name = `${user.name} (${id})`
            io.sockets.emit('chat', user)
        })

        socket.on('grocery', (data) => {
            groceries.push(data.grocery)

            io.sockets.emit('grocery', data.grocery)
        })

        socket.on('remove', (name) => {
            groceries = groceries.filter(grocery => grocery != name.name)
            console.log(groceries)

            io.sockets.emit('remove', name)
        })

        socket.on('drink', async (data) => {
            const drink = await get.ingredients(data.data.id)
            const ingredients = drink.ingredients

            ingredients.forEach(ingredient => {
                groceries.push(ingredient)
            })

            io.sockets.emit('drink', ingredients)
        })
    })
}