const emotes = [':emotes', ':happy', ':angry', ':sad', ':cry', ':laugh', ':kiss']

const
    chatForm = document.querySelector('[send-message]'),
    chatName = chatForm.querySelector('input[type="text"]:first-of-type')

export function check(emote) {
    return emotes.some(string => emote.includes(string))
}

export function run(emote) {
    if (emote.message === ':emotes') {
        return allEmotes()
    }

    let string
    emotes.forEach(emoticon => {
        if (emote.message.includes(emoticon)) {
            const name = emoticon.substring(1)
            const regex = new RegExp(emoticon, 'g')

            string = emote.message.replace(regex, createImg(`/images/${name}`))
        }
    })

    const message = `${emote.name}: ${string}`
    return createMessage(emote, message, 'user')
}

function allEmotes() {
    return emotes.map(emote => {
        return createMessage('', emote, 'command')
    })
}

// Helper functions
function createImg(emote) {
    return `<img src="${emote}.png">`
}

function createMessage(user, message, actor) {
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageElement.className = actor

    if (user) {
        if (user.name == `${chatName.value} ${user.name.split(' ')[1]}`) {
            messageElement.className = messageElement.className + ' you'
        }
    }

    return messageElement
}