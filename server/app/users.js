const express = require('express');
const User = require('../models/User');
const config = require('../config');
const axios = require('axios');
const {nanoid} = require('nanoid');
const {OAuth2Client} = require('google-auth-library');

const googleClient = new OAuth2Client(config.google.clientId);
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    });

    user.generateToken();
    await user.save()
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (!user) {
    return res.status(401).send({message: 'Credentials are wrong'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({message: 'Credentials are wrong'});
  }

  user.generateToken();
  await user.save();

  return res.send({message: 'Email and password correct!', user});
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

router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;

  const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  try {
    const response = await axios.get(debugTokenUrl);

    if (response.data.data.error) {
      return res.status(401).send({global: 'Facebook token incorrect'});
    }

    console.log(response.data);

    if (response.data.data['user_id'] !== req.body.id) {
      return res.status(401).send({global: 'User ID incorrect'});
    }

    let user = await User.findOne({email: req.body.email});

    if (!user) {
      user = await User.findOne({facebookId: req.body.id});
    }

    if (!user) {
      user = new User({
        email: req.body.email || nanoid(),
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name,
      });
    }

    user.generateToken();
    await user.save();

    res.send({message: 'Success', user});

  } catch (e) {
    return res.status(401).send({global: 'Facebook token incorrect'});
  }
});

router.post('/googleLogin', async (req, res) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.tokenId,
      audience: process.env.CLIENT_ID
    });

    const {name, email, sub: ticketUserId} = ticket.getPayload();

    if (req.body.googleId !== ticketUserId) {
      return res.status(401).send({global: 'User ID incorrect'});
    }

    let user = await User.findOne({email});

    if (!user) {
      user = new User({
        email,
        password: nanoid(),
        displayName: name,
      });
    }

    user.generateToken();
    await user.save();

    res.send({message: 'Success', user});
  } catch (e) {
    return res.status(500).send({global: 'Server error. Please try again.'});
  }
});

module.exports = router;