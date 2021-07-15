const express = require("express");
const { Qna, validateQna } = require("../models/qna");
const auth = require("../middleware/auth");
const router = express.Router();
const chalk = require("chalk");

router.post("/", async (req, res) => {
  const { error } = validateQna(req.body);
  if (error) {
    console.error(chalk.redBright(error.message));
    return res.status(400).send(error.details[0].message);
  }

  let qna = new Qna({
    question: req.body.question,
    answer: {
      title: req.body.answer.title,
      text: req.body.answer.text,
    },
  });

  const post = await qna.save();
  res.send(post);
});

router.get("/qnas/qna-search-page", async (req, res) => {
  const qnas = await Qna.find();
  res.send(qnas);
});

router.get("/private-area/qna-page/:id", async (req, res) => {
  const qna = await Qna.findOne({ _id: req.params.id });
  if (!qna) return res.status(404).send("איש הצוות לא נמצא במאגר המידע");
  res.send(qna);
});

router.put("/private-area/edit-qna-card/:id", async (req, res) => {
  const { error } = validateQna(req.body);
  if (error) {
    console.error(chalk.redBright(error.message));
    return res.status(400).send(error.details[0].message);
  }

  let qna = await Qna.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!qna)
    return res
      .status(404)
      .send("לא נמצאו שאלות ותשובות עם התעודת זהות שהועברה");

  qna = await Qna.findOne({ _id: req.params.id });
  res.send(qna);
});

router.get("/private-area/edit-qna-card/:id", auth, async (req, res) => {
  const qna = await Qna.findOne({ _id: req.params.id });
  if (!qna)
    return res.status(404).send("The qna with the given ID was not found.");
  res.send(qna);
});

router.delete("/:id", auth, async (req, res) => {
  const qna = await Qna.findOneAndRemove({ _id: req.params.id });
  if (!qna) return res.status(404).send("איש הצוות לא נמצא במאגר המידע");
  res.send(qna);
});

module.exports = router;
