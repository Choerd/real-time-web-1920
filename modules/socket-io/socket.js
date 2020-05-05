const get = require('../api/drinks')

module.exports = (io) => {
    let
        counter = 0,
        groceries = [],
        users = []

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
            const user = users.find(user => user.id == id)

            if (user === undefined) {
                socket.broadcast.emit('leave', {
                    user: 'server',
                    message: `Anonymous (${id}) left the chat!`
                })
            } else {
                socket.broadcast.emit('leave', {
                    user: 'server',
                    message: `${user.nickname} (${id}) left the chat!`
                })
            }
        })

        socket.on('chat', (user) => {
            user.name = `${user.name} (${id})`
            io.sockets.emit('chat', user)
        })

        socket.on('changeName', (data) => {
            data.id = id
            const user = users.find(user => user.id == id)

            if (user === undefined) {
                users.push(data)
                const message = `Anonymous (${data.id}) has changed his nickname to: ${data.nickname} (${data.id})`
                io.sockets.emit('nicknameChanged', message)
            } else {
                const message = `${user.nickname} has changed his nickname to: ${data.nickname} (${data.id})`
                io.sockets.emit('nicknameChanged', message)
                user.nickname = data.nickname
            }
        })

        socket.on('grocery', (data) => {
            groceries.push(data.grocery)
            io.sockets.emit('grocery', data.grocery)
        })

        socket.on('remove', (name) => {
            groceries = groceries.filter(grocery => grocery != name.name)
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

        socket.on('selectPeople', () => {
            if (users.length >= 2) {
                const people = pickTwoPeople(users)
                const splittedGroceries = splitGroceries(groceries)

                for (let i = 0; i < people.length; i++) {
                    people[i].groceries = splittedGroceries[i]
                }

                io.sockets.emit('done', people)
            }
        })

        socket.on('selectIngredient', async (data) => {
            if (data.ingredient != 'all') {
                socket.emit('select', await get.filteredDrinks(data))
            } else {
                socket.emit('select', await get.drinks())
            }
        })
    })
}

function splitGroceries(groceries) {
    const splitNumber = Math.ceil(groceries.length / 2)

    const firstHalf = groceries.slice(0, splitNumber)
    const secondHalf = groceries.slice(splitNumber, groceries.length)

    return [firstHalf, secondHalf]
}

function pickTwoPeople(users) {
    const allusers = users
    const getterOne = allusers[Math.floor(Math.random() * allusers.length)]

    const remainingUsers = allusers.filter(user => user !== getterOne)
    const getterTwo = remainingUsers[Math.floor(Math.random() * remainingUsers.length)]

    return [getterOne, getterTwo]
}