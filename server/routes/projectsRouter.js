const express = require('express');
const { Project, validateProject} = require('../models/project');
const auth = require('../middleware/auth');
const router = express.Router();
const fs = require("fs");
const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const name = req.body.name
    const year = req.body.year
    const projectFind = await Project.findOne({ name, year});
    if(projectFind) return storegePath('איש הצוות כבר נמצא במאגר המידע')
    const NameLowerCase = name.toLowerCase() + "-" + year.toLowerCase()
    if(!fs.existsSync(`public/images/projects/${NameLowerCase}`)){  
      fs.mkdirSync(`public/images/projects/${NameLowerCase}`) 
    }
    storegePath( null, `public/images/projects/${NameLowerCase}` );
  },
  filename: ( req, file, setName ) => {
    setName( null, file.originalname);
  }
})

const storageFromEditFile = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const name = req.body.name
    const year = req.body.year
    const NameLowerCase = name.toLowerCase() + "-" + year.toLowerCase()
    storegePath( null, `public/images/projects/${NameLowerCase}` );
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
    const name = req.body.name
    const year = req.body.year
    const NameLowerCase = name.toLowerCase() + "-" + year.toLowerCase()
    const cardImage = path.basename(req.body.cardUrl);
    const cardDir = `/images/projects/${NameLowerCase}/${cardImage}`
    const pamoramaImage = path.basename(req.body.urlPamorama);
    const pamoramaDir = `/images/projects/${NameLowerCase}/${pamoramaImage}`
    const beforeImage = path.basename(req.body.urlBefore);
    const beforeDir = `/images/projects/${NameLowerCase}/${beforeImage}`
    const sketchImage = path.basename(req.body.urlSketch);
    const sketchDir = `/images/projects/${NameLowerCase}/${sketchImage}`
    const imagingImage = path.basename(req.body.urlImaging);
    const imagingDir = `/images/projects/${NameLowerCase}/${imagingImage}`
    const constractionImage = path.basename(req.body.urlConstraction);
    const constractionDir = `/images/projects/${NameLowerCase}/${constractionImage}`
    const galleryImage = path.basename(req.body.urlGallery);
    const galleryDir = `/images/projects/${NameLowerCase}/${galleryImage}`
  
    let project = {
        name: req.body.name,
        year: req.body.year,
        size: req.body.size,
        category: req.body.category,
        description: req.body.description,
        country: req.body.country,
        city: req.body.city,
        cardUrl: cardDir,
        cardAlt: req.body.cardAlt,
        urlPamorama: pamoramaDir,
        altPamorama: req.body.altPamorama,
        urlBefore: beforeDir,
        altBefore: req.body.altBefore,
        desBefore: req.body.desBefore,
        urlSketch: sketchDir,
        altSketch: req.body.altSketch,
        desSketch: req.body.desSketch,
        urlImaging: imagingDir,
        altImaging: req.body.altImaging,
        desImaging: req.body.desImaging,
        urlConstraction: constractionDir,
        altConstraction: req.body.altConstraction,
        desConstraction: req.body.desConstraction,
        urlGallery: galleryDir,
        altGallery: req.body.altGallery,
    }
  
    const { error } = validateProject(project);
    if (error)return res.status(400).send(error.details[0].message);
  
    project = new Project(project);
    await project.save();
    res.send('הפרויקט נשמר בהצלחה');
  }
  return res.send('You are not authorized to create projects')
});

router.delete('/:id', auth, async (req, res) => {
  if(req.user && req.user.admin === true){
    let project = await Project.findOne({_id: req.params.id})
    if (!project) return res.status(404).send("הפרויקט לא נמצא");

    const name = project.name
    const year = project.year
    const nameLowerCase = name.toLowerCase() + "-" + year.toLowerCase()
    const newName = nameLowerCase.replace(/\s/g, "-")

    fs.readdir(`public/images/projects/${newName}`, (err, files)=>{
      for(let file of files){
      fs.unlinkSync(`public/images/projects/${newName}/${file}`)
    }
    fs.rmdirSync(`public/images/projects/${newName}`)
  })
    project = await Project.findOneAndRemove({ _id: req.params.id });
    return res.send('הפרויקט נמחק');
  }
    return res.send('You are not authorized to delete projects')
});

router.put('/private-area/edit-project-card/:id', auth, async (req, res) => {
  if(req.user && req.user.admin === true){
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!project) return res.status(404).send('The project with the given ID was not found.');
    
    project = await Project.findOne({ _id: req.params.id});
    res.send(project);
  }
  return res.send('You are not authorized to change projects')
});

/*************** עדכון פרויקט עם תמונות חדשות *****************/
  const checkPath = (reqDir, projectDir) => {
  if(reqDir === projectDir) return projectDir;
  return reqDir;
}

router.put('/:id',uploadFromEditFile.array("images", 20), auth, async (req, res) => {
  //multer - לא מעביר גישה לפאראמס לכן אני מעביר את תעודת הזהות בגוף הבקשה ומוסיף אותו לאוביקט המידע מהטופס

if(req.user && req.user.admin === true){
  let project = await Project.findOne({_id: req.body.id})
  if (!project) return res.status(404).send("הפרויקט לא נמצא");

  const name = project.name
  const year = project.year
  const nameLowerCase = name.toLowerCase() + "-" + year.toLowerCase()

  const cardImage = path.basename(req.body.cardUrl);
  const reqCardDir = `/images/projects/${nameLowerCase}/${cardImage}`
  const cardDir = checkPath(reqCardDir, project.cardUrl)

  const pamoramaImage = path.basename(req.body.urlPamorama);
  const reqPamoramaDir = `/images/projects/${nameLowerCase}/${pamoramaImage}`
  const pamoramaDir = checkPath(reqPamoramaDir, project.urlPamorama)

  const beforeImage = path.basename(req.body.urlBefore);
  const reqBeforeDir = `/images/projects/${nameLowerCase}/${beforeImage}`
  const beforeDir = checkPath(reqBeforeDir, project.urlBefore)

  const sketchImage = path.basename(req.body.urlSketch);
  const reqSketchDir = `/images/projects/${nameLowerCase}/${sketchImage}`
  const sketchDir = checkPath(reqSketchDir, project.urlSketch)

  const imagingImage = path.basename(req.body.urlImaging);
  const reqImagingDir = `/images/projects/${nameLowerCase}/${imagingImage}`
  const imagingDir = checkPath(reqImagingDir, project.urlImaging)

  const constractionImage = path.basename(req.body.urlConstraction);
  const reqConstractionDir = `/images/projects/${nameLowerCase}/${constractionImage}`
  const constractionDir = checkPath(reqConstractionDir, project.urlConstraction)

  const galleryImage = path.basename(req.body.urlGallery);
  const reqGalleryDir = `/images/projects/${nameLowerCase}/${galleryImage}`
  const galleryDir = checkPath(reqGalleryDir, project.urlGallery)

  project = {
    name: req.body.name,
    year: req.body.year,
    size: req.body.size,
    category: req.body.category,
    description: req.body.description,
    country: req.body.country,
    city: req.body.city,
    cardUrl: cardDir,
    cardAlt: req.body.cardAlt,
    urlPamorama: pamoramaDir,
    altPamorama: req.body.altPamorama,
    urlBefore:  beforeDir,
    altBefore: req.body.altBefore,
    desBefore: req.body.desBefore,
    urlSketch: sketchDir,
    altSketch: req.body.altSketch,
    desSketch: req.body.desSketch,
    urlImaging: imagingDir,
    altImaging: req.body.altImaging,
    desImaging: req.body.desImaging,
    urlConstraction: constractionDir,
    altConstraction: req.body.altConstraction,
    desConstraction: req.body.desConstraction,
    urlGallery:galleryDir,
    altGallery: req.body.altGallery,
}
  const { error } = validateProject(project);
  if (error) return res.status(400).send(error.details[0].message);

  project = await Project.findOneAndUpdate({ _id: req.body.id }, project);
  project = await Project.findOne({ _id: req.body.id });
  return res.send(project);
}
return res.send('You are not authorized to change projects')
});

router.get('/project-page/:id', async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  if (!project) return res.status(404).send('הפרוייקט לא נמצא במאגר המידע');
  res.send(project);
});

router.get('/private-area/projects-search-page', async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

router.get('/private-area/edit-project-card/:id', auth, async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  if (!project) return res.status(404).send('The project with the given ID was not found.');
  res.send(project);
});

// router.get('/private-area/my-projects', auth, async (req, res) => {
//   const projects = await Project.find({ user_id: req.user._id });
//   res.send(projects);
// });

// router.patch('/:id', async (req, res) => {
//   let project = await Project.findById(req.params.id);
//   if(!project) return res.status(404).send('הפרוייקט לא נמצא במאגר המידע');
//   let status = project.isLiked;
//   let changeStatus = !status;
//   project = await Project.findOneAndUpdate( {_id : req.params.id}, { isLiked : changeStatus});
//   project = await Project.save();
//   res.send(project);
// })

module.exports = router; 