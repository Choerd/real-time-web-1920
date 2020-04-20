// Todo: Wanneer een boodschap meer dan 1x voorkomt een counter toevoegen
// Todo: Wanneer een boodschap meer dan 1x voorkomt een - toevoegen om te minderen in hoeveelheid

const grocerylist = document.querySelector('[grocery-container] ul')

export function add(data) {
    grocerylist.append(groceryElement(data))
}

function groceryElement(data) {
    const grocery = document.createElement('li')
    const removeButton = document.createElement('span')

    grocery.textContent = data
    removeButton.textContent = 'X'

    grocery.append(removeButton)
    removeButton.addEventListener('click', (event) => remove(event.target))

    return grocery
}

export function getAll(data) {
    const grocies = data.groceries

    grocies.forEach(grocery => {
        add(grocery)
    })
}

function remove(element) {
    const grocery = element.parentElement
    grocery.remove()
}

// Remove all groceries
document.querySelector('[grocery-container] button').addEventListener('click', () => {
    const groceries = [...grocerylist.children]
    groceries.forEach(grocery => {
        grocery.remove()
    })
})