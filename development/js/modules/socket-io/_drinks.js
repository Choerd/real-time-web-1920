import * as grocery from '../groceries/groceries'

export default (io) => {
    const drinksContainer = document.querySelector('[drinks]')
    const drinks = [...drinksContainer.children]

    drinks.forEach(drink => {
        drink.addEventListener('click', () => {
            const data = { id: drink.id, drink: drink.querySelector('p').textContent }
            io.emit('drink', { data })
        })
    })
}