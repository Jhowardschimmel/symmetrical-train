const express = require('express')
const app = express()
const planets = require('./planets.json')
const port = 3000
const bodyParser = require('body-parser')

const fs = require('fs')
var cuid = require('cuid')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))



app.get('/', (req, res)=> {
    res.end('Welcome to the planets api');
})

app.get('/api/planets', (req, res) => {
    res.json(planets)
})

app.post('/api/planet', (req, res) => {
    const {
        planet,
        moons,
        diameter,
        distanceFromSun
    } = req.body

    if (planet) { 
        const newPlanet = {
            id: cuid(),
            planet,
            moons,
            diameter,
            distanceFromSun
        }

        const planetString = JSON.stringify(newPlanet)
        
        fs.appendFile('planets.json', planetString, (err) => {
            if (err) {
                throw err
            } else {
                console.log(`Planet ${newPlanet} added!`)
                res.status(201).json(response)
            }
        })
    } else {
        res.status(400)
    }

})



app.listen(port, () => {
    console.log(`app listening at  http://localhost:${port}`)
})