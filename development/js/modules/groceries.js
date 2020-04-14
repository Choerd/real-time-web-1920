const grocerielist = document.querySelector('[grocerie-container] ul')

export function add() {
    const grocerie = document.createElement('li')
    grocerie.textContent = 'Test'
    grocerielist.append(grocerie)
}