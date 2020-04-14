const drinks = require('../modules/drinks/all')

const
    express = require('express'),
    router = express.Router()

router.get('/', async (req, res) => res.render('index', {
    drinks: await drinks()
}))

module.exports = router