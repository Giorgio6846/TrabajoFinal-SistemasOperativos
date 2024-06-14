const { run } = require('./src/dbConnection')

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