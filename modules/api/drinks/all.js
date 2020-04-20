const fetcher = require('../fetcher')

module.exports = async () => {
    const alcoholicDrinks = await fetcher("https://the-cocktail-db.p.rapidapi.com/filter.php?a=Alcoholic")
    return alcoholicDrinks.drinks
}