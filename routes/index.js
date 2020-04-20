const get = require('../modules/api/drinks')

const
    express = require('express'),
    router = express.Router()

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', async (req, res) => res.render('index', { drinks: await get.drinks() }))

module.exports = router