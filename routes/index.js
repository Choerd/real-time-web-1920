const get = require('../modules/api/drinks')
const load = require('../modules/api/ingredients')

const
    express = require('express'),
    router = express.Router()

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', async (req, res) => res.render('index', {
    data: {
        drinks: await get.drinks(),
        ingredients: await load.ingredients()
    }
}))

module.exports = router