import * as message from './modules/chatting'

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

    socket.emit('command', {
        name: chatName.value,
        message: chatString.value
    })

    socket.emit('emote', {
        name: chatName.value,
        message: chatString.value
    })

    chatString.value = ''
})

socket.on('chat', (user) => {
    message.chat(user)
})

socket.on('command', (command) => {
    message.command(command)
})

socket.on('emote', (emote) => {
    message.emote(emote)
})

// Joining the chat
socket.on('join', (data) => {
    message.server(data)
})

// Leaving the chat
socket.on('leave', (data) => {
    message.server(data)
})