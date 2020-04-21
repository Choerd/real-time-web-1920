const grocerylist = document.querySelector('[grocery-container] ul')

// Add a single grocery Done

// Remove a single grocery

// Remove all groceries


export function add(data) {
    const grocery = document.createElement('li')
    const removeButton = document.createElement('span')

    grocery.textContent = data
    removeButton.textContent = 'X'

    grocery.append(removeButton)
    // removeButton.addEventListener('click', (event) => remove(event.target))

    grocerylist.append(grocery)

    return removeButton
}

export function remove(element) {

    console.log('poep')

    const li = element.parentElement

    const text = element.parentElement.textContent
    const grocery = text.substring(0, text.length - 1)


    li.remove()
}

export function renderAll(groceries) {
    if (groceries.length > 0) {
        groceries.forEach(grocery => {
            add(grocery)
        })
    }
}

function removeAll() {
    const groceries = [...grocerylist.children]
    groceries.forEach(grocery => {
        grocery.remove()
    })
}

// Remove all groceries
document.querySelector('[grocery-container] button').addEventListener('click', removeAll)