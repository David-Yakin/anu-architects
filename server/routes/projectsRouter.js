const express = require("express");
const { Project, validateProject } = require("../models/project");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const name = req.body.name;
    const projectFind = await Project.findOne({ name });
    if (projectFind)
      return storegePath("פרויקט עם השם הזה כבר נמצא במאגר המידע");
    const nameLowerCase = name.toLowerCase();
    if (!fs.existsSync(`public/images/projects/${nameLowerCase}`))
      fs.mkdirSync(`public/images/projects/${nameLowerCase}`);
    storegePath(null, `public/images/projects/${nameLowerCase}`);
  },
  filename: (req, file, setName) => setName(null, file.originalname),
});

const storageFromEditFile = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const name = req.body.name;
    const nameLowerCase = name.toLowerCase();
    storegePath(null, `public/images/projects/${nameLowerCase}`);
  },
  filename: (req, file, setName) => setName(null, file.originalname),
});

const checkFileType = (file, cb) => {
  const filetypes = /(jpeg|jpg|png|pdf)/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  return cb("Error: Images or PDF Only!");
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

router.post("/", upload.array("images", 30), auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    const { name } = req.body;
    const folder = name.toLowerCase();

    const makeDir = (folder, key) => {
      const image = path.basename(req.body[key]);
      return `/images/projects/${folder}/${image}`;
    };
    const checkUrl = (url, key) =>
      url ? makeDir(folder, key) : "/images/logo/logo_black.png";

    const checkName = name => name.replace(/-/g, " ");
    const checkReq = reqItem => (reqItem ? reqItem : "לא מוגדר");
    const checkPath = url => (url ? path.basename(url) : "לא מוגדר");

    let project = {
      name: checkName(req.body.name),
      year: req.body.year,
      size: req.body.size,
      category: req.body.category,
      address: {
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        zip: checkReq(req.body.zip),
      },
      description: checkReq(req.body.description),
      files: {
        contracts: [
          {
            name: checkPath(req.body.contract),
            url: checkUrl(req.body.contract, "contract"),
            remarks: "כאן ניתן לכתוב הערות",
          },
        ],
        licensing: [
          {
            name: checkPath(req.body.licensing),
            url: checkUrl(req.body.licensing, "licensing"),
            remarks: "כאן ניתן לכתוב הערות",
          },
        ],
        experts: [
          {
            firstName: checkReq(req.body.expertFirstName),
            lastName: checkReq(req.body.expertLastName),
            phone: checkReq(req.body.expertPhone),
            files: [
              {
                name: checkPath(req.body.expertFile),
                url: checkUrl(req.body.expertFile, "expertFile"),
                remarks: "כאן ניתן לכתוב הערות",
              },
            ],
          },
        ],
      },
      images: {
        card: {
          url: checkUrl(req.body.cardUrl, "cardUrl"),
          alt: checkReq(req.body.cardAlt),
        },
        panorama: {
          url: checkUrl(req.body.urlPamorama, "urlPamorama"),
          alt: checkReq(req.body.altPamorama),
        },
        before: [
          {
            url: checkUrl(req.body.urlBefore, "urlBefore"),
            alt: checkReq(req.body.altBefore),
            description: checkReq(req.body.desBefore),
          },
        ],
        constraction: [
          {
            url: checkUrl(req.body.urlConstraction, "urlConstraction"),
            alt: checkReq(req.body.altConstraction),
            description: checkReq(req.body.desConstraction),
          },
        ],
        constraction: [
          {
            url: checkUrl(req.body.urlConstraction, "urlConstraction"),
            alt: checkReq(req.body.altConstraction),
            description: checkReq(req.body.desConstraction),
          },
        ],
        sketches: [
          {
            url: checkUrl(req.body.urlSketch, "urlSketch"),
            alt: checkReq(req.body.altSketch),
            description: checkReq(req.body.desSketch),
            remarks: "כאן ניתן לכתוב הערות",
          },
        ],
        imaging: [
          {
            url: checkUrl(req.body.urlImaging, "urlImaging"),
            alt: checkReq(req.body.altImaging),
            description: checkReq(req.body.desImaging),
            remarks: "כאן ניתן לכתוב הערות",
          },
        ],
        references: [
          {
            url: checkUrl(req.body.referenceUrl, "referenceUrl"),
            alt: checkReq(req.body.referenceAlt),
            remarks: "כאן ניתן לכתוב הערות",
          },
        ],
        plans: [
          {
            url: checkUrl(req.body.urlPlans, "urlPlans"),
            alt: checkReq(req.body.altPlans),
            remarks: "כאן ניתן לכתוב הערות",
          },
        ],
        gallery: [checkUrl(req.body.urlGallery, "urlGallery")],
      },
      userID: req.body.userID,
      isPublished: false,
    };

    const { error } = validateProject(project);
    if (error) return res.status(400).send(error.details[0].message);

    project = new Project(project);
    await project.save();

    const folderName = name.replace(/\s/g, "-");
    if (!fs.existsSync(`public/images/projects/${folderName}`))
      fs.mkdirSync(`public/images/projects/${folderName}`);

    user = await User.findOneAndUpdate(
      { _id: project.userID },
      {
        $push: {
          projects: project._id,
        },
      }
    );
    await user.save();
    return res.send("הפרויקט נשמר בהצלחה");
  }
  return res.send("You are not authorized to create projects");
});

router.put(
  "/:id",
  uploadFromEditFile.array("images", 20),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      let project = await Project.findOne({ _id: req.params.id });
      if (!project) return status(400).send("no project found");
      const checkName = name => name.replace(/-/g, " ");

      const makeDir = key => {
        const folder = req.body.name;
        const image = path.basename(req.body[key]);
        return `/images/projects/${folder}/${image}`;
      };

      project = {
        name: checkName(req.body.name),
        year: req.body.year,
        size: req.body.size,
        category: req.body.category,
        address: {
          country: req.body.country,
          city: req.body.city,
          street: req.body.street,
          houseNumber: req.body.houseNumber,
          zip: req.body.zip,
        },
        description: req.body.description,
        files: {
          contracts: [
            {
              name: project.files.contracts[0].name,
              url: project.files.contracts[0].url,
              remarks: project.files.contracts[0].remarks,
            },
          ],
          licensing: [
            {
              name: project.files.licensing[0].name,
              url: project.files.licensing[0].url,
              remarks: project.files.licensing[0].remarks,
            },
          ],
          experts: [
            {
              firstName: project.files.experts[0].firstName,
              lastName: project.files.experts[0].lastName,
              phone: project.files.experts[0].phone,
              files: [
                {
                  name: project.files.experts[0].files[0].name,
                  url: project.files.experts[0].files[0].url,
                  remarks: project.files.experts[0].files[0].remarks,
                },
              ],
            },
          ],
        },

        images: {
          card: {
            url: req.body.cardUrl
              ? makeDir("cardUrl")
              : project.images.card.url,
            alt: req.body.cardAlt,
          },
          panorama: {
            url: req.body.urlPamorama
              ? req.body.urlPamorama
              : project.images.panorama.url,
            alt: req.body.altPamorama,
          },
          before: [
            {
              url: req.body.urlBefore
                ? makeDir("urlBefore")
                : project.images.before[0].url,
              alt: req.body.altBefore,
              description: req.body.desBefore,
            },
          ],
          constraction: [
            {
              url: req.body.urlConstraction
                ? makeDir("urlConstraction")
                : project.images.constraction[0].url,
              alt: req.body.altConstraction,
              description: req.body.desConstraction,
            },
          ],
          sketches: [
            {
              url: req.body.urlSketch
                ? makeDir("urlSketch")
                : project.images.sketches[0].url,
              alt: req.body.altSketch,
              description: req.body.desSketch,
              remarks: project.images.sketches[0].remarks,
            },
          ],
          imaging: [
            {
              url: req.body.urlImaging
                ? makeDir("urlImaging")
                : project.images.imaging[0].url,
              alt: req.body.altImaging,
              description: req.body.desImaging,
              remarks: project.images.imaging[0].remarks,
            },
          ],
          references: [
            {
              url: project.images.references[0].url,
              alt: project.images.references[0].alt,
              remarks: project.images.references[0].remarks,
            },
          ],
          plans: [
            {
              url: req.body.urlPlans
                ? makeDir("urlPlans")
                : project.images.plans[0].url,
              alt: req.body.altPlans,
              remarks: project.images.plans[0].remarks,
            },
          ],
          gallery: [
            req.body.urlGallery
              ? makeDir("urlGallery")
              : project.images.gallery[0],
          ],
        },
        userID: project.userID,
        isPublished: req.body.isPublished,
      };

      const { error } = validateProject(project);
      if (error) return res.status(400).send(error.details[0].message);

      project = await Project.findOneAndUpdate({ _id: req.params.id }, project);
      return res.send(project);
    }
    return res.send("You are not authorized to change projects");
  }
);

router.delete("/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    let project = await Project.findOne({ _id: req.params.id });
    if (!project) return res.status(404).send("הפרויקט לא נמצא");

    const name = project.name;
    const newName = name.replace(/\s/g, "-");
    fs.readdir(`public/images/projects/${newName}`, (err, files) => {
      if (files.length) {
        for (let file of files) {
          fs.unlinkSync(`public/images/projects/${newName}/${file}`);
        }
      }
      fs.rmdirSync(`public/images/projects/${newName}`);
    });

    let user = await User.findOne({ _id: project.userID });
    if (!user) return res.status(404).send("המשתמש לא נמצא");
    user.projects = user.projects.filter(i => i != project._id);
    await user.save();

    project = await Project.findOneAndRemove({ _id: req.params.id });
    return res.send("הפרויקט נמחק");
  }
  return res.send("You are not authorized to delete projects");
});

router.get("/my-projects/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    const user = await User.findById({ _id: req.params.id });
    let projects = user.projects;
    const check = async array => {
      const newArray = [];
      for (let i = 0; i < array.length; i++) {
        project = await Project.findById({ _id: projects[i] });
        newArray.push(project);
      }
      return newArray;
    };
    let newProjects = await check(projects);
    return res.send(newProjects);
  }
  return "You can not see this user projects";
});

router.get("/private-area/projects-search-page", async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

router.get("/:id", auth, async (req, res) => {
  const project = await Project.findById({ _id: req.params.id });
  if (!project) return res.status(404).send("Project not found.");
  res.send(project);
});

router.patch("/changePublishStatus/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
    let status = project.isPublished;
    let changeStatus = !status;
    project = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { isPublished: changeStatus }
    );
    await project.save();
    res.send(project);
  }
});

module.exports = router;
