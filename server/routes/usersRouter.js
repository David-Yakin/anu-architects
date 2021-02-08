const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser, validateProjects } = require('../models/user');
const { Card } = require('../models/project');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/private-area/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

const getCards = async (cardsArray) => {
  const cards = await Card.find({ "bizNumber": { $in: cardsArray } });
  return cards;
};

router.delete('/:id', auth, async (req, res) => {
  const user = await User.findOneAndRemove({ _id: req.params.id });
  if (!user) return res.status(404).send('המשתמש לא נמצא במאגר המידע');
  res.send(user);
});


router.patch('/:id', auth, async (req, res) => {
  let user = await User.findById(req.params.id);
  if(!user) return res.status(404).send('לא נמצא המשתמש');
  let status = user.isBloger;
  let changeStatus = !status;
  
  user = await User.findOneAndUpdate( {_id : req.params.id}, { isBloger : changeStatus});

  user = await user.save();
  res.send(user);
});


router.patch('/projects', auth, async (req, res) => {

  const { error } = validateProjects(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const cards = await getCards(req.body.cards);
  if (cards.length !== req.body.cards.length) return res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);

});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');
  
  user = new User(_.pick(req.body, ['name', 'lastName', 'email','phone', 'password', 'admin', 'projects']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['name', 'email']));
});

module.exports = router; 