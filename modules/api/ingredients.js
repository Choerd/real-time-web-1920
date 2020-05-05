const fetcher = require('./fetcher')

async function ingredients() {
    const ingredients = await fetcher("https://the-cocktail-db.p.rapidapi.com/list.php?i=list")
    return ingredients.drinks
}

module.exports = {
    ingredients
}