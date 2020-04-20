// Todo: Wanneer een boodschap meer dan 1x voorkomt een counter toevoegen
// Todo: Wanneer een boodschap meer dan 1x voorkomt een - toevoegen om te minderen in hoeveelheid

export function add(data) {
    const grocerylist = document.querySelector('[grocery-container] ul')
    grocerylist.append(grocery(data))

}

function grocery(data) {
    const message = data.message.split(':add')[1].substring(1)
    const grocery = document.createElement('li')
    const removeButton = document.createElement('span')

    grocery.textContent = message
    removeButton.textContent = 'X'

    grocery.append(removeButton)
    removeButton.addEventListener('click', e => remove(e.target))

    return grocery
}

function remove(element) {
    const grocery = element.parentElement
    grocery.remove()
}