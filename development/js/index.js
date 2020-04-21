import * as run from './modules/socket-io/socket'

const socket = io()

run.sockets(socket)

// drinks.drinks()


// socket.on('pickDrink', (data) => {
//     data.ingredients.forEach(ingredient => {
//         grocery.add(ingredient)
//     })

//     message.server(`All the ingredients of: ${data.name} were added to the grocerylist`)
// })