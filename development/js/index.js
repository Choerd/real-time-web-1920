import * as message from './modules/chatting'
import * as grocerie from './modules/groceries'

const socket = io()

const
    chatForm = document.querySelector('[send-message]'),
    chatName = chatForm.querySelector('input[type="text"]:first-of-type'),
    chatString = chatForm.querySelector('div input[type="text"]'),
    chatSubmit = chatForm.querySelector('div input[type="submit"]')

// Chatting
chatSubmit.addEventListener('click', (event) => {
    event.preventDefault()

    socket.emit('chat', {
        name: chatName.value,
        message: chatString.value
    })

    grocerie.add()

    chatString.value = ''
})

socket.on('chat', (user) => {
    message.chat(user)
})

// Joining the chat
socket.on('join', (data) => {
    message.server(data)
})

// Leaving the chat
socket.on('leave', (data) => {
    message.server(data)
})