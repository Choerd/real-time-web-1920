import * as message from '../chat/messages'
import * as grocery from '../groceries/groceries'

export default (io) => {
    // Joining the chat
    io.on('join', (data) => {
        message.server(data.chat.message)
        grocery.renderAll(data.grocerylist.groceries)

        const listItems = document.querySelectorAll('[grocery-container] ul li span')
        listItems.forEach(li => {
            li.addEventListener('click', (event) => {
                const string = event.target.parentElement.textContent
                const groceryName = string.substring(0, string.length - 1)
                io.emit('remove', { name: groceryName })
            })
        })
    })

    io.on('joined', (data) => message.server(data.message))

    io.on('nicknameChanged', (data) => message.server(data))

    // Leaving the chat
    io.on('leave', (data) => message.server(data.message))
}
