const drinks = require('../modules/api/drinks/all')

const
    express = require('express'),
    router = express.Router()

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', async (req, res) => res.render('index', { drinks: await drinks() }))

router.post('/', (req, res) => {
    console.log(req.body)

    res.status(204).send()
})

module.exports = router