const express = require('express')
const path = require('path')

const userRouter = require('./src/routes/users')
const authRouter = require('./src/routes/auth')
const postRouter = require('./src/routes/posts')

const app = express()

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")

app.set("views", path.join(__dirname, "/../presentation_layer/"))
app.use(express.static(path.join(__dirname, "/../presentation_layer/css")))

const host = '0.0.0.0'
const port = 8080;

app.use('/api',userRouter);
app.use('/api',authRouter);
app.use('/api',postRouter);

//Enables the server
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})

module.exports = app