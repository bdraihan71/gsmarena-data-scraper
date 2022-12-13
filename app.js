const express = require('express')
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const app = express()

//setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')


app.get('/', (req, res) => {
    res.send('<h1>Hello Raihan</h1>')
})

app.get('*', (req, res) => {
    res.send('<h1>Please use the correct Route</h1>')
})

const port = process.env.PORT || 8080
app.listen(port, () =>{
    console.log(`server is running on port: ${port}`)
})