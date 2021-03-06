const grocerylist = document.querySelector('[grocery-container] ul')

export function add(data) {
    const grocery = document.createElement('li')
    const removeButton = document.createElement('span')

    grocery.textContent = data
    grocery.style.overflow = 'hidden'
    removeButton.textContent = 'X'

    grocery.append(removeButton)
    grocerylist.append(grocery)

    return removeButton
}

export function renderAll(groceries) {
    if (groceries.length > 0) {
        groceries.forEach(grocery => {
            add(grocery)
        })
    }
}