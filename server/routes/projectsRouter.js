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
    if(projectFind) return storegePath('פרויקט עם השם הזה כבר נמצא במאגר המידע')
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
  const filetypes = /(jpeg|jpg|png)/;
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

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter,});

router.post('/', upload.array("images", 20), auth, async (req, res) => {
  if(req.user && req.user.admin){
    const name = req.body.name
    const year = req.body.year
    const folder = name.toLowerCase() + "-" + year.toLowerCase()

    const makeDir = (folder, key) => {
      const image = path.basename(req.body[key]);
      return  `/images/projects/${folder}/${image}`
    }
  
    let project = {
        name: req.body.name,
        year: req.body.year,
        size: req.body.size,
        category: req.body.category,
        description: req.body.description,
        country: req.body.country,
        city: req.body.city,
        cardUrl: makeDir(folder, "cardUrl"),
        cardAlt: req.body.cardAlt,
        urlPamorama: makeDir(folder, "urlPamorama"),
        altPamorama: req.body.altPamorama,
        urlBefore: makeDir(folder, "urlBefore"),
        altBefore: req.body.altBefore,
        desBefore: req.body.desBefore,
        urlSketch: makeDir(folder, "urlSketch"),
        altSketch: req.body.altSketch,
        desSketch: req.body.desSketch,
        urlImaging: makeDir(folder, "urlImaging"),
        altImaging: req.body.altImaging,
        desImaging: req.body.desImaging,
        urlConstraction: makeDir(folder, "urlConstraction"),
        altConstraction: req.body.altConstraction,
        desConstraction: req.body.desConstraction,
        urlGallery: makeDir(folder, "urlGallery"),
        altGallery: req.body.altGallery,
    }

    const { error } = validateProject(project);
    if (error)return res.status(400).send(error.details[0].message);
    project = new Project(project);
    await project.save();
    return res.send('הפרויקט נשמר בהצלחה');
  }
  return res.send('You are not authorized to create projects')
});

router.delete('/:id', auth, async (req, res) => {
  if(req.user && req.user.admin){
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
  if(req.user && req.user.admin){
    const { error } = validateProject(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!project) return res.status(404).send('The project with the given ID was not found.');
    
    project = await Project.findOne({ _id: req.params.id});
    return res.send(project);
  }
  return res.send('You are not authorized to change projects')
});

  const checkPath = (reqDir, projectDir) => {
  if(reqDir === projectDir) return projectDir;
  return reqDir;
}


router.put('/:id',uploadFromEditFile.array("images", 20), auth, async (req, res) => {
if(req.user && req.user.admin){
  let project = await Project.findOne({_id: req.body.id})
  if (!project) return res.status(404).send("הפרויקט לא נמצא");

  const name = project.name
  const year = project.year
  const folder = name.toLowerCase() + "-" + year.toLowerCase()

  const makeDir = (folder, key) => {
    const image = path.basename(req.body[key]);
    const reqDir = `/images/projects/${folder}/${image}`
    return checkPath(reqDir, project[key])
  }

  project = {
    name: req.body.name,
    year: req.body.year,
    size: req.body.size,
    category: req.body.category,
    description: req.body.description,
    country: req.body.country,
    city: req.body.city,
    cardUrl: makeDir(folder, "cardUrl"),
    cardAlt: req.body.cardAlt,
    urlPamorama: makeDir(folder, "urlPamorama"),
    altPamorama: req.body.altPamorama,
    urlBefore: makeDir(folder, "urlBefore"),
    altBefore: req.body.altBefore,
    desBefore: req.body.desBefore,
    urlSketch: makeDir(folder, "urlSketch"),
    altSketch: req.body.altSketch,
    desSketch: req.body.desSketch,
    urlImaging: makeDir(folder, "urlImaging"),
    altImaging: req.body.altImaging,
    desImaging: req.body.desImaging,
    urlConstraction: makeDir(folder, "urlConstraction"),
    altConstraction: req.body.altConstraction,
    desConstraction: req.body.desConstraction,
    urlGallery: makeDir(folder, "urlGallery"),
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

module.exports = router; 