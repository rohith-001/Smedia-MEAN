const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const app = express()
const path = require('path');
const port = process.env.PORT || 3000

require('./db')
require('./models/user')
require('./models/guser')
require('./models/post')
require('./middleware/OAuth')

//Middlewere
app.use(cors())
app.use(passport.initialize());
app.use(express.json())

//Router
const auth = require("./routes/auth")
const post = require("./routes/post")
const user = require("./routes/user")


app.use(auth)
app.use(post)
app.use(user)
app.get('/', (req, res) => {
  res.redirect('/home');
})

app.use(express.static(path.join(__dirname,'public')))
app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

//Port init
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})