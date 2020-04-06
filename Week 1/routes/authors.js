const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('authors/index')
})

router.get('/new', (req, res) => {
    res.render('authors/new')
})

router.post('/', async (req, res) => {
    res.render('authors/index')
})

module.exports = router