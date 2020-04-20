const socket = io()

export function drinks() {
    const drinksContainer = document.querySelector('[drinks]')
    const drinks = [...drinksContainer.children]

    drinks.forEach(drink => {
        drink.addEventListener('click', () => {
            const data = { id: drink.id, drink: drink.querySelector('p').textContent }
            socket.emit('pickDrink', { data })
        })
    })
}