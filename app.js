const express = require('express')

//import routes
const scraperRoute = require('./routes/scraperRoute')

const app = express()

//setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//middleware array
const middleware = [
    express.urlencoded({ extended: true }),
    express.json()
]

app.use(middleware)

app.use('/', scraperRoute)

app.get('*', (req, res) => {
    res.send('<h1>Please use the correct Route</h1>')
})

const port = process.env.PORT || 8080
app.listen(port, () =>{
    console.log(`server is running on port: ${port}`)
})