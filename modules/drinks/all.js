const fetcher = require('../data')

module.exports = async () => {
    const alcoholicDrinks = await fetcher("https://the-cocktail-db.p.rapidapi.com/filter.php?a=Alcoholic")
    return alcoholicDrinks.drinks
}