import * as message from './modules/chatting'
import * as grocery from './modules/groceries'
import * as drinks from './modules/drinks'

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

    chatString.value = ''
})

drinks.drinks()

// Basic chatting
socket.on('chat', (data) => {
    message.chat(data)
})

socket.on('addGrocery', (data) => {
    grocery.add(data)
})

// Joining the chat
socket.on('join', (data) => {
    message.server(data)
})

// Leaving the chat
socket.on('leave', (data) => {
    message.server(data)
})