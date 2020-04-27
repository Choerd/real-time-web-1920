const grocerylist = document.querySelector('[grocery-container] ul')

export function add(data) {
    const grocery = document.createElement('li')
    const removeButton = document.createElement('span')

    grocery.textContent = data
    removeButton.textContent = 'X'

    grocery.append(removeButton)
    grocerylist.append(grocery)

    removeButton.addEventListener('click', () => {
        console.log('ja')
    })

    return removeButton
}

export function renderAll(groceries) {
    if (groceries.length > 0) {
        groceries.forEach(grocery => {
            add(grocery)
        })
    }
}