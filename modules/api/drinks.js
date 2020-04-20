const fetcher = require('./fetcher')

async function drinks() {
    const alcoholicDrinks = await fetcher("https://the-cocktail-db.p.rapidapi.com/filter.php?a=Alcoholic")
    return alcoholicDrinks.drinks
}

async function drink(id) {
    const singleDrink = await fetcher(`https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${id}`)
    return singleDrink.drinks
}

async function ingredients(id) {
    const response = await fetcher(`https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${id}`)
    const data = response.drinks[0]
    const rawIngredients = Object.entries(data).filter(entry => checkValue(entry))

    const ingredients = rawIngredients.map(ingredient => {
        return ingredient[1]
    })

    const object = {
        name: data.strDrink,
        ingredients: ingredients
    }

    return object
}

function checkValue(entry) {
    if (entry[0].includes('strIngredient') && entry[1] != null) {
        return entry
    }
}

module.exports = {
    drinks,
    drink,
    ingredients
}