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
            io.emit('grocery', { grocery: chatString.value.split(':add')[1].substring(1) })
        } else {
            io.emit('chat', { name: chatName.value, message: chatString.value })
        }

        chatString.value = ''
    })

    // Basic chatting
    io.on('chat', (data) => {
        message.chat(data)
    })

    io.on('grocery', (data) => {
        const removeButton = grocery.add(data)

        removeElement(removeButton, io)
    })

    io.on('drink', (ingredients) => {
        ingredients.forEach(ingredient => {
            removeElement(grocery.add(ingredient), io)
        })
    })

    io.on('remove', (data) => {
        for (const li of document.querySelectorAll("li")) {
            if (li.textContent.includes(data.name)) {
                li.remove()
            }
        }
    })
}

function removeElement(button, io) {
    button.addEventListener('click', (event) => {
        const string = event.target.parentElement.textContent
        const groceryName = string.substring(0, string.length - 1)

        io.emit('remove', { name: groceryName })
    })
}