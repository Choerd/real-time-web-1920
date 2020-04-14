const commands = ['/commands', '/red', '/yellow', '/green', '/blue']

export function check(command) {
    return commands.find(message => message === command)
}

export function run(command) {
    if (command === '/commands') {
        return allCommands()
    }

    if (command === '/red') {
        return color('#E01E5A', 'Red')
    }

    if (command === '/yellow') {
        return color('#EBB22E', 'Yellow')
    }

    if (command === '/green') {
        return color('#2FB67D', 'Green')
    }

    if (command === '/blue') {
        return color('#37C5F0', 'Blue')
    }
}

function allCommands() {
    return commands.map(command => {
        return createMessage(command)
    })
}

function color(color, name) {
    document.querySelector('[chatpage]').setAttribute('style', `background-color: ${color}`)
    return createMessage(`Changed color to: ${name}`)
}

function createMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.textContent = message
    messageElement.className = 'command'

    return messageElement
}