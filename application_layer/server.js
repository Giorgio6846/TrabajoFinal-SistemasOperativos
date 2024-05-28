const fs = require('fs')
const express = require('express')
const path = require('path')
const { run } = require('./dbConnection')

const router = express()

var production = true

router.use(express.urlencoded({extended: false}))

router.set("view engine", "ejs")

router.set("views", path.join(__dirname, "/../presentation_layer/"))
router.use(express.static(path.join(__dirname, "/../presentation_layer/css")))

const host = '0.0.0.0'
const port = 8080;

//Enables the server
router.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})

router.get('/', (req,res) =>{
    res.render("index")
})

router.get('/register', (req,res) =>{
    res.render("register")
})

router.get('/login', (req,res) =>{
    res.render("login")
})

router.get('/test', (req,res) =>{ 
    run()
    res.render("index")
})