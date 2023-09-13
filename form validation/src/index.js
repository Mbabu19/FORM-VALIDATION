const express = require("express")
const path = require("path")
const app = express()
 const hbs = require("hbs")
const LogInCollection = require("./mongodb")
const { Collection } = require("mongoose")
const port = 3000

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../Homepage')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)




app.get('/', (req, res) => {
    res.render('login')
})



app.get('/signup', (req, res) => {
    res.render('main')
})

app.post('/signup', async (req, res) => {
    
    

    const data = {
        username: req.body.username,
        email:req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword
    }

    await LogInCollection.insertMany([data])
    res.render("home")


})


app.post('/', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ username: req.body.username })
       

        if (check.password === req.body.password) {
            res.status(201).render("home",{})
        }

        else {
            const response = `<html><body><script>alert('wrong password')</script></body></html>`
            res.send(response)
        }
    } 
    
    catch (e) {

        const response = `<html><body><script>alert('wrong details')</script></body></html>`
        res.send(response)        

    }


})



app.listen(port, () => {
    console.log('port connected');
})
