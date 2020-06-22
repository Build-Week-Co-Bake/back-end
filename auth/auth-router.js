const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model');
const Issues = require('../issues/issues-model');
const restricted = require('./auth-middleware');
const { isValid } = require('../users/users-service');
const hidden = require('./vars');

// POST to register a new user
router.post('/register', (req,res) => {
  const credentials = req.body;

  if(isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 8);
    credentials.password = hash;

    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(err => {
        console.log('POST to /register', err);
        res.status(500).json({ error: err.message });
      })
  } else {
    res.status(400).json({ error: "Missing email or password", userId: credentials.id });
  }
});

// POST to login a user
router.post('/login', (req,res) => {
  const { email, password } = req.body;

  if(isValid(req.body)) {
    Users.findBy({ email: email })
      .then(([user]) => {
        let userId = user.id;
        console.log('user', user);
        if(user && bcryptjs.compareSync(password, user.password)) {
          const token = createToken(user);
          res.status(200).json({ message: `Welcome to the API, ${user.name}`, token, userId });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(err => {
        console.log('POST to /login', err);
        res.status(400).json({ message: err.message });
      })
  } else {
    res.status(500).json({ message: "Email and password are required" });
  }
});

// GET all issues by user id
router.get('/users/:id/issues', restricted, (req,res) => {
  const { id } = req.params;

  Issues.findByUserId(id)
    .then(issues => {
      if(issues) {
        res.status(200).json({ data: issues });
      } else {
        res.status(404).json({ error: `Issues not found for user: ${id}` })
      }
    })
    .catch(err => {
      console.log('GET tp /:id/issues', err);
      res.status(500).json({ error: "Unable to retrieve your issues" });
    })
});

const createToken = user => {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const secret = hidden.jwtSecret;

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
};

module.exports = router;