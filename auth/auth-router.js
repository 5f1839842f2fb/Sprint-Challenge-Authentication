const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database/dbConfig')

const validateUsernameAndPassword = (req, res, next) => {
  if (!("username" in req.body) || !("password" in req.body)) {
    res.status(400).send("Missing username or password")
  } else {
    next()
  }
}

router.post('/*', validateUsernameAndPassword)

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    db('users').insert({ username: req.body.username, password:hash })
    .then(response => res.status(200).send("Success!"))
    .catch(error => res.status(401).send("Error"))
  });
});

router.post('/login', (req, res) => {
  db('users').where({ username: req.body.username }).first()
  .then(response => {
    bcrypt.compare(req.body.password, response.password, (err, result) => {
      if (result) {
        req.session.name = req.body.username;
        console.log(`${req.body.username} logged in`)
        res.status(200).send("Logged in!")
      } else {
        res.status(401).send("Invalid credentials")
      }
    })
  })
  .catch(error => res.status(400).send("Account doesn't exist"))
});

router.get('/logout', (req, res) => {
  console.log(req.session.name)
  if ("name" in req.session) {
    console.log(`${req.session.name} logged out`)
    req.session.destroy()
    res.status(200).send("Logged out!")
  } else {
    res.status(400).send("Not logged in")
  }
})

module.exports = router;
