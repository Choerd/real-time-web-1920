import * as message from '../chat/messages'
import * as grocery from '../groceries/groceries'

export default (io) => {
    const
        chatForm = document.querySelector('[send-message]'),
        chatName = chatForm.querySelector('input[type="text"]:first-of-type'),
        chatString = chatForm.querySelector('div input[type="text"]'),
        chatSubmit = chatForm.querySelector('div input[type="submit"]')

    // Chatting
    chatSubmit.addEventListener('click', (event) => {
        event.preventDefault()

        if (chatString.value.includes(':add')) {
            io.emit('grocery', {
                grocery: chatString.value.split(':add')[1].substring(1)
            })
        } else {
            io.emit('chat', {
                name: chatName.value,
                message: chatString.value
            })
        }

        chatString.value = ''
    })

    // Basic chatting
    io.on('chat', (data) => {
        message.chat(data)
    })

    io.on('grocery', (data) => {
        const removeButton = grocery.add(data)

        removeButton.addEventListener('click', (event) => grocery.remove(event.target))
    })
}