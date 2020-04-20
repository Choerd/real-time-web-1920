const fetcher = require('../fetcher')

module.exports = async (id) => {
    const singleDrink = await fetcher(`https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${id}`)
    return singleDrink.drinks
}