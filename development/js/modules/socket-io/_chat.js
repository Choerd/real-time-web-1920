import * as message from '../chat/messages'
import * as grocery from '../groceries/groceries'

export default (io) => {
    const
        chatForm = document.querySelector('[send-message]'),
        chatName = chatForm.querySelector('input[type="text"]:first-of-type'),
        chatString = chatForm.querySelector('div input[type="text"]'),
        chatSubmit = chatForm.querySelector('div input[type="submit"]'),
        groceriesDone = document.querySelector('[grocery-container] button'),
        selectIngredient = document.querySelector('[drinks] select')

    selectIngredient.addEventListener('change', (event) => {
        io.emit('selectIngredient', { ingredient: event.target.value })
    })

    io.on('select', (data) => {
        const drinkElements = [...document.querySelector('[drinks]').children]
        drinkElements.shift()

        drinkElements.forEach(element => {
            element.remove()
        })

        data.forEach(drink => {
            document.querySelector('[drinks]').appendChild(createDrinkElement(drink, io))
        })

        const newDrinks = [...document.querySelector('[drinks]').children]
        newDrinks.shift()
        newDrinks.forEach(drink => {
            drink.addEventListener('click', () => {
                const data = { id: drink.id, drink: drink.querySelector('p').textContent }
                io.emit('drink', { data })
            })
        })
    })

    groceriesDone.addEventListener('click', () => {
        io.emit('selectPeople')
    })

    io.on('done', (data) => {
        const groceries = [...document.querySelectorAll('[grocery-container] ul li')]

        data.forEach(person => {
            person.groceries.forEach(ingredient => {
                groceries.forEach(grocery => {
                    const name = grocery.textContent.substring(0, grocery.textContent.length - 1)

                    if (name == ingredient) {
                        grocery.setAttribute('user-id', `${person.nickname}(${person.id}):`)
                    }
                })
            })
        })
        groceriesDone.remove()
    })

    chatName.addEventListener('change', (event) => {
        io.emit('changeName', { nickname: event.target.value })
    })

    // Chatting
    chatSubmit.addEventListener('click', (event) => {
        event.preventDefault()

        if (chatString.value.includes(':add')) {
            io.emit('grocery', { grocery: chatString.value.split(':add')[1].substring(1) })
        } else {
            io.emit('chat', { name: chatName.value, message: chatString.value })
        }

        chatString.value = ''
    })

    // Basic chatting
    io.on('chat', (data) => {
        message.chat(data)
    })

    io.on('grocery', (data) => {
        const removeButton = grocery.add(data)

        removeElement(removeButton, io)
    })

    io.on('drink', (ingredients) => {
        ingredients.forEach(ingredient => {
            removeElement(grocery.add(ingredient), io)
        })
    })

    io.on('remove', (data) => {
        for (const li of document.querySelectorAll("li")) {
            if (li.textContent.includes(data.name)) {
                li.remove()
            }
        }
    })
}

function createDrinkElement(data, io) {
    const article = document.createElement('article')
    const image = document.createElement('img')
    const paragraph = document.createElement('p')

    article.id = data.idDrink
    image.setAttribute('src', data.strDrinkThumb)
    paragraph.textContent = data.strDrink

    article.appendChild(image)
    article.appendChild(paragraph)

    return article
}

function removeElement(button, io) {
    button.addEventListener('click', (event) => {
        const string = event.target.parentElement.textContent
        const groceryName = string.substring(0, string.length - 1)

        io.emit('remove', { name: groceryName })
    })
}