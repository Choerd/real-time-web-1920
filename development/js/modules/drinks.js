import { json } from "body-parser"

export function drinks() {
    const drinksContainer = document.querySelector('[drinks]')
    const drinks = [...drinksContainer.children]

    drinks.forEach(drink => {
        drink.addEventListener('click', () => {
            const data = {
                id: drink.id,
                drink: drink.querySelector('p').textContent
            }
            sendData(data)
        })
    })
}

function sendData(data) {
    const jsonString = JSON.stringify(data)
    const xhr = new XMLHttpRequest()

    xhr.open('post', '/')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(jsonString)
}