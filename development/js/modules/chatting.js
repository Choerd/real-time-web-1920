const chatContainer = document.querySelector('[chat]')

export function chat(user) {
    const messageElement = document.createElement('div')
    messageElement.textContent = `${user.name}: ${user.message}`
    messageElement.className = 'user'

    addMessage(messageElement)
}

export function server(data) {
    console.log(data)
    const messageElement = document.createElement('div')
    messageElement.textContent = data
    messageElement.className = 'server'

    addMessage(messageElement)
}

function addMessage(messageElement) {
    chatContainer.append(messageElement)
    scrollToBottom()
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight
}