const express = require('express');
const { Resume, validateResume } = require('../models/resume');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/resumes/resume-search-page', async (req, res) => {
  const resumes = await Resume.find();
  res.send(resumes);
});

router.get('/private-area/resume-page/:id', async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id });
  if (!resume) return res.status(404).send('איש הצוות לא נמצא במאגר המידע');
  res.send(resume);
});

router.put('/private-area/edit-resume-card/:id', auth, async (req, res) => {
  const { error } = validateResume(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let resume = await Resume.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, req.body);
  if (!resume) return res.status(404).send('The resume with the given ID was not found.');
  
  resume = await Resume.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(resume);
});

router.get('/private-area/edit-resume-card/:id', auth, async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id });
  if (!resume)return res.status(404).send('The resume with the given ID was not found.');
  res.send(resume);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateResume(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let resume = new Resume(
    {
      title: req.body.title,
      subTitle: req.body.subTitle,
      firstP: req.body.firstP,
      secondp: req.body.secondp,
      thirdP: req.body.thirdP,
      fourthP: req.body.fourthP,
      profileUrl: req.body.profileUrl,
      profileAlt: req.body.profileAlt,
      user_id: req.user._id
    }
    );
    
    const post = await resume.save();
    res.send(post);
    
  });
  
  
  router.delete('/:id', auth, async (req, res) => {
    const resume = await Resume.findOneAndRemove({ _id: req.params.id });
    if (!resume) return res.status(404).send('איש הצוות לא נמצא במאגר המידע');
    res.send(resume);
  });

  module.exports = router; 