const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./config/secrets.js');
const Users = require('./data/users-model');

const server = express();

server.use(express.json());

server.get('/api/users', restricted, async (req, res) => {
  try {
      const users = await Users.get();
      res.status(200).json(users);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the users',
    });
  }
});

server.post('/api/register', async (req, res) => {
  let user = req.body;

  if (!user.username || !user.password || !user.department) {
    return res.status(400).json({ message: 'Need username, password, and department' });
  }

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash

  try {
    const added = await Users.add(user);
    const token = generateToken(added)
      
      res.status(201).json({
        message: `Welcome ${added.username}!`,
        authToken: token
      });
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
});

server.post('/api/login', async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ message: 'Need username and password' });
  }

  try {
    let user = await Users.findBy({ username }).first()    

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          authToken: token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }

    } else {
      res.status(404).json({ message: 'user not found' });
    }

  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  }
});

function restricted(req, res, next) {
  
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, payload) => {
      if (err) {
        res.status(403).json({ message: 'You are not authorized' });
      } else {
        req.userId = payload.userId;
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
}

function generateToken(user) {
  return jwt.sign({
    userId: user.id,
  }, secrets.jwtSecret, {
    expiresIn: '1d',
  })
}

const port = process.env.PORT || 5001;
server.listen(port, function() {
  console.log(`\n=== API Listening on http://localhost:${port} ===\n`);
});