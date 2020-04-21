import * as message from '../chat/messages'
import * as grocery from '../groceries/groceries'

export default (io) => {
    // Joining the chat
    io.on('join', (data) => {
        message.server(data.chat.message)
        grocery.renderAll(data.grocerylist.groceries)
    })

    io.on('joined', (data) => {
        message.server(data.message)
    })

    // Leaving the chat
    io.on('leave', (data) => {
        message.server(data.message)
    })
}