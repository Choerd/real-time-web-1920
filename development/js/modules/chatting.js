import * as commands from './commands'

const
    chatContainer = document.querySelector('[chat]'),
    chatForm = document.querySelector('[send-message]'),
    chatName = chatForm.querySelector('input[type="text"]:first-of-type'),
    chatString = chatForm.querySelector('div input[type="text"]')

export function chat(user) {
    const messageElement = document.createElement('div')
    messageElement.textContent = `${user.name}: ${user.message}`
    messageElement.className = 'user'

    if (user.name.split(' ')[0] == chatName.value) {
        messageElement.className = messageElement.className + ' you'
    }

    addMessage(messageElement)
}

export function server(data) {
    const messageElement = document.createElement('div')
    messageElement.textContent = data.message
    messageElement.className = 'server'
    addMessage(messageElement)
}

export function command(command) {
    if (commands.check(command.message)) {
        addMessage(commands.run(command.message))
    } else {
        const messageElement = document.createElement('div')
        messageElement.textContent = `This command is not available!`
        messageElement.className = 'command'
        addMessage(messageElement)
    }
}

// Functions I re-use
function addMessage(messageElement) {
    if (messageElement.length === undefined) {
        chatContainer.append(messageElement)
    } else {
        messageElement.forEach(element => chatContainer.append(element))
    }
    chatString.value = ''
    scrollToBottom()
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
}