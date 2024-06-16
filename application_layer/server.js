const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const history = require('connect-history-api-fallback');
const ViteExpress = require("vite-express")

const userRouter = require('./src/routes/users')
const authRouter = require('./src/routes/auth')
const postRouter = require('./src/routes/posts')
const commentRouter = require('./src/routes/comments')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(history());

const host = '0.0.0.0'
const port = 8080;
ViteExpress.config({ mode: "production"})

app.use('/api',userRouter);
app.use('/api',authRouter);
app.use('/api',postRouter);
app.use('/api',commentRouter)

//Enables the server
const server = app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})

ViteExpress.bind(app, server)

module.exports = app