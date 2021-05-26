const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser, validateEmail, validatePassword } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { mailReq } = require('./mailRouter');

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
  return res.send(_.pick(user, ['name', 'email']));
});

router.post('/forgot-password', async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = req.body;
  let user = await User.findOne({email})
  if(!user) return res.status(400).send('לא נמצא המשתמש עם כתובת המייל הזאת במאגר המידע')

  const secret = config.get('jwtKey') + user.password
  const token = jwt.sign({ _id: user._id, email: user.email }, secret, {expiresIn: '15m'});

  const link = `http://localhost:3000/private-area/reset-password/${user.id}/${token}`

  const html = `<table cellpadding='0' cellspacing='0'>
  <tr>
      <td>
          <h1 align="right">איפוס סיסמה</h1>
          <h2 align="right" cellpadding='0'>לחץ על הלינק על מנת לאפס את הסיסמה</h2>
      </td>
  </tr>
  <tr ><td><p>http://localhost:3000/private-area/reset-password/${user.id}/${token}</p></td></tr>
  <tr ><td align="right"><p>לשאלות נוספות ניתן לפנות לכתובת המייל</p></td></tr>
  <tr ><td align="right">anu.arch.rl@gmail.com</td></tr>
</table>`
  
  const subject = 'anu-architects password reset'

  mailReq(user.email, subject, link, html).then(res.send('Email sent!')).catch(error => res.status(404).send(error.message));
})

router.post('/reset-password/:id/:token', async (req, res) => {
  try{
    const data = req.body;
    const { error } = validatePassword(data);
    if (error) return res.status(400).send('בעיה בזיהוי המייל');

    const { id, token } = req.params;
    let user = await User.findById(id)
    if(!user) return res.status(404).send('המשתמש לא רשום במאגר המידע')

    const secret = config.get('jwtKey') + user.password;
    const payload = jwt.verify(token, secret)
    if(!payload) return res.status(404).send('problem at validation')

    user.password = data.password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
   
    return res.json({ token: user.generateAuthToken() });
  }catch(err){
    return res.status(404).send('הייתה בעיה באימות המייל')
  }
})

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
     lastName: req.body.lastName,
     adress: {
      country: req.body.country ,
      city: req.body.city ,
      street: req.body.street ,
      houseNumber : req.body.houseNumber ,
      zip: req.body.zip ,
    },
    });
  user = await user.save();
  res.send(user);
});

module.exports = router; 