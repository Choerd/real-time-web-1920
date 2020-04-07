const emotes = [':emotes', ':happy', ':angry', ':sad', ':cry', ':laugh', ':kiss']

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

            console.log(emote.message)
            // Todo: Fixen dat je meerdere emoticons in een zin kan gebruiken

            string = emote.message.replace(`${emoticon}`, createImg(`/images/${name}`))
        }
    })

    const message = `${emote.name}: ${string}`
    return createMessage(message, 'user you')
}

function allEmotes() {
    return emotes.map(emote => {
        return createMessage(emote, 'command you')
    })
}

// Helper functions
function createImg(emote) {
    return `<img src="${emote}.png">`
}

function createMessage(message, actor) {
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageElement.className = actor

    return messageElement
}