const socket = io()
const messageContainer = document.querySelector('[chat]')
const messageForm = document.querySelector('[send-message]')
const messageInput = messageForm.querySelector('input[type="text"]')
const messageSubmit = document.querySelector('[send-message] input[type="submit"]')

const name = prompt('What is your name?')
appendMessage('You joined', 'you')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} joined`, 'joined')
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} left`, 'left')
})

messageSubmit.addEventListener('click', event => {
    event.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`, 'you')
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message, user) {
    const messageElement = document.createElement('div')

    if (user === 'you') {
        messageElement.classList = 'you'
    }
    // else if (user === 'joined' || user === 'left') {
    //     console.log('joined or left')
    // }
    messageElement.innerText = message
    messageContainer.append(messageElement)
}