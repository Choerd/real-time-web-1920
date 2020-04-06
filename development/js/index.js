const socket = io()
const messageContainer = document.querySelector('[chat]')

if (messageContainer) {
    const messageForm = document.querySelector('[send-message]')
    const messageInput = messageForm.querySelector('input[type="text"]')
    const messageSubmit = document.querySelector('[send-message] input[type="submit"]')

    // const name = prompt('What is your name?')
    // appendMessage('You joined', 'you')
    // socket.emit('new-user', name)

    messageSubmit.addEventListener('click', event => {
        event.preventDefault()
        const message = messageInput.value
        appendMessage(`${message}`, 'you')
        socket.emit('send-chat-message', message)
        messageInput.value = ''
    })
}

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} joined`, 'joined')
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} left`, 'left')
})

function appendMessage(message, user) {
    const messageElement = document.createElement('div')

    if (user === 'you') {
        messageElement.classList = 'you'
    }

    messageElement.innerText = message
    messageContainer.append(messageElement)
    scrollToBottom()
}

const register = document.querySelector('[registerpage] form a')
if (register) {
    document.querySelector('[registerpage] form a').addEventListener('click', () => {

        const name = document.querySelector('[registerpage] form input[type="text"]').value

        console.log(name)
        socket.emit('new-user', name)
    })
}

function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
}