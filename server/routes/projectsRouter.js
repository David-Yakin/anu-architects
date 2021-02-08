const express = require('express');
const { Project, validateProject} = require('../models/project');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/project-page/:id', async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  if (!project) return res.status(404).send('הפרוייקט לא נמצא במאגר המידע');
  res.send(project);
});

router.get('/private-area/my-projects', auth, async (req, res) => {
  const projects = await Project.find({ user_id: req.user._id });
  res.send(projects);
});

router.get('/private-area/projects-search-page', async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

router.patch('/:id', async (req, res) => {
  let project = await Project.findById(req.params.id);
  if(!project) return res.status(404).send('הפרוייקט לא נמצא במאגר המידע');
  let status = project.isLiked;
  let changeStatus = !status;
  
  project = await Project.findOneAndUpdate( {_id : req.params.id}, { isLiked : changeStatus});

  project = await Project.save();
  res.send(project);
})

router.delete('/:id', auth, async (req, res) => {
  const project = await Project.findOneAndRemove({ _id: req.params.id });
  if (!project) return res.status(404).send("הפרויקט עם מס' הפרויקט הזה לא נמצא");
  res.send(project);
});

router.put('/private-area/edit-project-card/:id', auth, async (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!project) return res.status(404).send('The project with the given ID was not found.');
  
  project = await Project.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(project);
});

router.get('/private-area/edit-project-card/:id', auth, async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  console.log(project);

  if (!project) return res.status(404).send('The project with the given ID was not found.');
  res.send(project);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateProject(req.body);
  if (error)return res.status(400).send(error.details[0].message);

  let project = new Project(
    {
      name: req.body.name,
      year: req.body.year,
      size: req.body.size,
      category: req.body.category,
      description: req.body.description,
      country: req.body.country,
      city: req.body.city,
      cardUrl: req.body.cardUrl,
      cardAlt: req.body.cardAlt,
      urlPamorama: req.body.urlPamorama,
      altPamorama: req.body.altPamorama,
      urlBefore: req.body.urlBefore,
      altBefore: req.body.altBefore,
      desBefore: req.body.desBefore,
      urlSketch: req.body.urlSketch,
      altSketch: req.body.altSketch,
      desSketch: req.body.desSketch,
      urlImaging: req.body.urlImaging,
      altImaging: req.body.altImaging,
      desImaging: req.body.desImaging,
      urlConstraction: req.body.urlConstraction,
      altConstraction: req.body.altConstraction,
      desConstraction: req.body.desConstraction,
      urlGallery: req.body.urlGallery,
      altGallery: req.body.altGallery,
      user_id: req.user._id
    }
  );

  const post = await project.save();
  res.send(post);

});

module.exports = router; 