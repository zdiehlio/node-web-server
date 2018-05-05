const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express()

hbs.registerPartials(`${__dirname}/views/partials`)
//creating view engine with handlebars
app.set('view engine', 'hbs')

//next ensures function moves to next middleware
app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`
  
  console.log(log)
  fs.appendFile('server.log', log + '\n', err => {
    if(err) {
      console.log('Error', err)
      
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(`${__dirname}/public`))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the Home Page'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request'
  })
})

app.listen(3000, () => {
  console.log('Server is up on Port 3000')
  
})