const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.generateToken();
    await user.save()
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(401).send({message: 'Credentials are wrong'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({message: 'Credentials are wrong'});
  }

  user.generateToken();
  await user.save();

  return res.send({message: 'Username and password correct!', user});
});

router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  const success = {message: 'Success'};

  if (!token) return res.send(success);

  const user = await User.findOne({token});

  if (!user) return res.send(success);

  user.generateToken();

  await user.save();

  return res.send(success);
});

router.post('/secret', auth, async (req, res) => {
  return res.send({message: 'Secret message', username: req.user.username});
});

module.exports = router;