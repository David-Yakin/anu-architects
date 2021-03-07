const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('המשתמש קיים');

  user = await new User(
    {
      userID: req.body.userID,
      name: req.body.name,
      lastName:req.body.lastName,
      email:req.body.email,
      phone: req.body.phone,
      adress: {
        country: req.body.adress.country ,
        city: req.body.adress.city ,
        street: req.body.adress.street ,
        houseNumber : req.body.adress.houseNumber ,
        zip: req.body.adress.zip ,
      },
      password: req.body.password
    });

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['name', 'email']));
});


router.get('/user/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  res.send(user);
});


router.get('/private-area/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

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

router.patch('/isProjectManager/:id', auth, async (req, res) => {
  let user = await User.findById(req.params.id);
  if(!user) return res.status(404).send('לא נמצא המשתמש');
  let status = user.isProjectManager;
  let changeStatus = !status;
  user = await User.findOneAndUpdate( {_id : req.params.id}, { isProjectManager : changeStatus});
  user = await user.save();
  res.send(user);
});

router.patch('/user/:id', auth, async (req, res) => {
  let user = await User.findById(req.params.id);
  if(!user) return res.status(404).send('לא נמצא המשתמש');

  user = await User.findOneAndUpdate( {_id : req.params.id}, {
     phone : req.body.phone,
     name: req.body.name,
     lastName: req.body.lastName
    });
  user = await user.save();
  res.send(user);
});


module.exports = router; 