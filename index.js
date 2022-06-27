const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine());
app.set("views", "/views");

// app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

// app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => console.log(`listen on port ${port}`))