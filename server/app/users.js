const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save()
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;