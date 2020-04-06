if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const
    express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts')

app
    .set('view engine', 'ejs')
    .set('views', 'views')
    .set('layout', 'layouts/layout')
    .use(expressLayouts)
    .use(express.static('production'))

const
    indexRouter = require('./routes/index'),
    authorRouter = require('./routes/authors')

// Routes
app
    .use('/', indexRouter)
    .use('/authors', authorRouter)

app.listen(process.env.PORT || 4000)