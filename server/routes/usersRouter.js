const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {
  User,
  validateUser,
  validateEmail,
  validatePassword,
} = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { mailReq } = require("./mailRouter");
const { generateTemplate } = require("../mail-templates/mail-templates");
const { validateMail } = require("../models/mail");
const chalk = require("chalk");

router.post("/", async (req, res) => {
  try {
    const matches = req.body.password.match(/[^A-Za-z0-9!@#$%^&*-]/g) || [];
    if (matches.length !== 0) return res.status(400).send("Invalide Password!");

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("המשתמש קיים");

    user = {
      userID: req.body.userID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        zip: req.body.zip,
      },
      password: req.body.password,
    };

    const { error } = validateUser(user);
    if (error) {
      console.error(chalk.redBright(error.message));
      return res.status(400).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);

    user = await new User(user);
    await user.save();

    const to = "anu.arch.rl@gmail.com";
    const subject = "A new user has been created";
    const link = `http://localhost:3000/private-area/user/${user._id}`;
    const mail = {
      userId: user._id,
      description: `${user.firstName} ${user.lastName}`,
    };
    const html = generateTemplate(mail).newUser;
    return mailReq(to, subject, link, html)
      .then(res.send(_.pick(user, ["_id"])))
      .catch(error => {
        console.log(error.message);
        return res.status(404).send(error.message);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/user/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.send(user);
});

router.get("/private-area/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin === true) {
    user = await User.findOneAndRemove({ _id: req.params.id });
    if (!user) return res.status(404).send("המשתמש לא נמצא במאגר המידע");
    return res.send(user);
  }
  return res.send("you are not authorized to delete users");
});

router.patch("/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin === true) {
    try {
      user = await User.findById(req.params.id);
      if (!user) return res.status(404).send("לא נמצא המשתמש");
      let status = user.isBloger;
      let changeStatus = !status;
      user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { isBloger: changeStatus }
      );
      user = await user.save();
      res.send(user);
    } catch (error) {
      console.log(error);
      return res.send(error.message);
    }
  }
  return res.send("you are not authorized to edit users");
});

router.patch("/user/:id", auth, async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("לא נמצא המשתמש");

  user = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      phone: req.body.phone,
      address: {
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        zip: req.body.zip,
      },
    }
  );
  user = await user.save();
  res.send(user);
});

router.post("/forgot-password", async (req, res) => {
  const { error } = validateEmail(req.body);
  if (error) {
    console.error(chalk.redBright(error.message));
    return res.status(400).send(error.details[0].message);
  }

  const { email } = req.body;
  let user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .send("לא נמצא המשתמש עם כתובת המייל הזאת במאגר המידע");

  const secret = config.get("jwtKey") + user.password;
  const token = jwt.sign({ _id: user._id, email: user.email }, secret, {
    expiresIn: "15m",
  });

  const subject = "anu-architects password reset";
  const link = `http://localhost:3000/private-area/reset-password/${user.id}/${token}`;
  const mail = { userId: user.id, token: token };
  const html = generateTemplate(mail).resetPassword;

  mailReq(user.email, subject, link, html)
    .then(res.send("Email sent!"))
    .catch(error => res.status(404).send(error.message));
});

router.post("/reset-password/:id/:token", async (req, res) => {
  try {
    const matches = req.body.password.match(/[^A-Za-z0-9!@#$%^&*-]/g) || [];
    if (matches.length !== 0) return res.status(400).send("Invalide Password!");

    const data = req.body;
    const { error } = validatePassword(data);
    if (error) return res.status(400).send("בעיה בזיהוי המייל");

    const { id, token } = req.params;
    let user = await User.findById(id);
    if (!user) return res.status(404).send("המשתמש לא רשום במאגר המידע");

    const secret = config.get("jwtKey") + user.password;
    const payload = jwt.verify(token, secret);
    if (!payload) return res.status(404).send("problem at validation");

    user.password = data.password;
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    return res.json({ token: user.generateAuthToken() });
  } catch (err) {
    return res.status(404).send("הייתה בעיה באימות המייל");
  }
});

router.post("/send-mail", async (req, res) => {
  const { error } = validateMail(req.body);
  if (error) {
    console.error(chalk.redBright(error.message));
    return res.status(400).send(error.details[0].message);
  }
  const { email, subject, message, name, lastName, phone } = req.body;

  const to = "anu.arch.rl@gmail.com";
  const newMessage = message.replace(/\./g, ".<br/>");
  const text = message;
  const mail = { firstName: name, lastName, message: newMessage, email, phone };
  const html = generateTemplate(mail).contactUs;

  mailReq(to, subject, text, html)
    .then(res.send("Email sent!"))
    .catch(error => res.status(404).send(error.message));
});

module.exports = router;
