const express = require('express');
const { Resume, validateResume } = require('../models/resume');
const auth = require('../middleware/auth');
const router = express.Router();
const fs = require("fs");
const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const resumeFind = await Resume.findOne({ firstName, lastName});
    if(resumeFind) return storegePath('איש הצוות כבר נמצא במאגר המידע')
    const NameLowerCase = firstName.toLowerCase() + "-" + lastName.toLowerCase()

    if(!fs.existsSync(`public/images/resumes/${NameLowerCase}`)){  
      fs.mkdirSync(`public/images/resumes/${NameLowerCase}`) 
    }
    storegePath( null, `public/images/resumes/${NameLowerCase}` );
  },
  filename: ( req, file, setName ) => {
    setName( null, file.originalname);
  }
})

const storageFromEditFile = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const NameLowerCase = firstName.toLowerCase() + "-" + lastName.toLowerCase()
    storegePath( null, `public/images/resumes/${NameLowerCase}` );
  },
  filename: ( req, file, setName ) => {
    setName( null, file.originalname);
  }
})

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  return cb("Error: Images Only!");
};

const fileFilter = (req, file, cb) => checkFileType(file, cb);

const uploadFromEditFile = multer({
  storage: storageFromEditFile,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter,
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter,
});

router.post('/', upload.array("images", 20), auth, async (req, res) => {
  if(req.user && req.user.admin === true){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const NameLowerCase = firstName.toLowerCase() + "-" + lastName.toLowerCase()
    const profileImage = path.basename(req.body.profileUrl);
    let profileDir = `/images/resumes/${NameLowerCase}/${profileImage}`
  
    let resume = {
      firstName: req.body.firstName, 
      lastName: req.body.lastName, 
      subTitle: req.body.subTitle,
      firstP: req.body.firstP,
      secondp: req.body.secondp,
      thirdP: req.body.thirdP,
      fourthP: req.body.fourthP,
      profileUrl: profileDir,
      profileAlt: req.body.profileAlt
    }
  
    const { error } = validateResume(resume);
    if (error) return res.status(400).send(error.details[0].message);
  
    resume = new Resume(resume);
    await resume.save();
    res.send('איש הצוות נשמר בהצלחה');
  }
  return res.send('You are not authorized to create resume!')
  });

// עדכון קורות חיים עם תמונה
router.put('/:id', uploadFromEditFile.array("images", 20), auth, async (req, res) => {
  if(req.user && req.user.admin === true){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const NameLowerCase = firstName.toLowerCase() + "-" + lastName.toLowerCase()
    const profileImage = path.basename(req.body.profileUrl);
    let profileDir = `/images/resumes/${NameLowerCase}/${profileImage}`
  
    let resume = {
      firstName: req.body.firstName, 
      lastName: req.body.lastName, 
      subTitle: req.body.subTitle,
      firstP: req.body.firstP,
      secondp: req.body.secondp,
      thirdP: req.body.thirdP,
      fourthP: req.body.fourthP,
      profileUrl: profileDir,
      profileAlt: req.body.profileAlt
    }
   
    const { error } = validateResume(resume);
    if (error) return res.status(400).send(error.details[0].message);
  
    resume = await Resume.findOneAndUpdate({ _id: req.body.id}, resume);
    if (!resume) return res.status(404).send('The resume with the given ID was not found.');
  
    res.send('the resume has been changed!');
  }
  return res.send('You are not authorized to change resume!')
});

router.put('/private-area/edit-resume-card/:id', auth, async (req, res) => {
  if(req.user && req.user.admin === true){
    const { error } = validateResume(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let resume = await Resume.findOneAndUpdate({ _id: req.params.id}, req.body);
    if (!resume) return res.status(404).send('The resume with the given ID was not found.');
    
    res.send('the resume has been changed!');
  }
  return res.send('You are not authorized to change resume!')
});
  
  router.delete('/:id', auth, async (req, res) => {
    if(req.user.admin === true){
      try{
        let resume = await Resume.findOne({_id: req.params.id})
        if (!resume) return res.status(404).send("איש הצוות לא נמצא");
        const firstName = resume.firstName
        const lastName = resume.lastName
        const nameLowerCase = firstName.toLowerCase() + "-" + lastName.toLowerCase()
        const newName = nameLowerCase.replace(/\s/g, "-")
  
        fs.readdir(`public/images/resumes/${newName}`, (err, files)=>{
          for(let file of files){
          fs.unlinkSync(`public/images/resumes/${newName}/${file}`)
        }
        fs.rmdirSync(`public/images/resumes/${newName}`)
        })
        resume = await Resume.findOneAndRemove({ _id: req.params.id });
        res.send('איש הצוות נמחק');
      }catch(err){ console.log(err.message);}}
    return res.send('You are not authorized to delete resumes')
  });

router.get('/resumes/resume-search-page', async (req, res) => {
  const resumes = await Resume.find();
  res.send(resumes);
});

router.get('/private-area/resume-page/:id', async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id });
  if (!resume) return res.status(404).send('איש הצוות לא נמצא במאגר המידע');
  res.send(resume);
});

router.get('/private-area/edit-resume-card/:id', auth, async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id });
  if (!resume)return res.status(404).send('The resume with the given ID was not found.');
  res.send(resume);
});

  module.exports = router; 