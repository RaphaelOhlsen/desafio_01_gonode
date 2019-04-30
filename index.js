const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const checkMiddleware = (req, res, next) => {
  if (req.query.age) return next()
  else res.redirect('/')
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(
  express.urlencoded({
    extended: false
  })
)

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  age >= 18
    ? res.redirect('/major/?age=' + age)
    : res.redirect('/minor/?age=' + age)
})

app.get('/minor', checkMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.get('/major', checkMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

app.listen(3000)
