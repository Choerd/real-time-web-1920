const fetch = require('node-fetch')

const fetcher = async (url) => {
    const host = `the-cocktail-db.p.rapidapi.com`
    const key = `4ba18b4ebdmsh3e5b56d2a35470fp1ec696jsn3d2bc898bd20`
    const headers = { "headers": { "x-rapidapi-host": host, "x-rapidapi-key": key } }

    const response = await fetch(url, headers)
    return await response.json()
}

module.exports = fetcher