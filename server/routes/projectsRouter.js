const express = require("express");
const {
  Project,
  validateProject,
  validateImage,
  validateExpert,
} = require("../models/project");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { generateTemplate } = require("../mail-templates/mail-templates");
const { mailReq } = require("./mailRouter");
const { log } = require("console");

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
    const folder = req.body.name;
    storegePath(null, `public/images/projects/${folder}`);
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

/************* Create Project *********************/

router.post("/", upload.array("images", 30), auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
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
            },
          ],
          licensing: [
            {
              name: checkPath(req.body.licensing),
              url: checkUrl(req.body.licensing, "licensing"),
            },
          ],
          experts: [
            {
              firstName: checkReq(req.body.expertFirstName),
              lastName: checkReq(req.body.expertLastName),
              phone: checkReq(req.body.expertPhone),
              category: {
                text: req.body.expertCategory ? req.body.categoryText : "כולם",
                value: req.body.expertCategory
                  ? req.body.expertCategory
                  : "all",
              },
              file: {
                name: checkPath(req.body.expertFileAtl),
                url: checkUrl(req.body.expertFile, "expertFile"),
              },
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
          gallery: [
            {
              url: checkUrl(req.body.urlGallery, "urlGallery"),
              alt: checkReq(req.body.altGallery),
            },
          ],
        },
        userID: req.body.userID,
        isPublished: false,
      };

      const { error } = validateProject(project);
      if (error) {
        console.log(error.message);
        return res.status(400).send(error.details[0].message);
      }

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
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
    }
  }
  return res.send("You are not authorized to create projects");
});

/************** Edit Project *************/

router.put(
  "/:id",
  uploadFromEditFile.array("images", 20),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findOne({ _id: req.params.id });
        if (!project) return status(400).send("no project found");
        const { body } = req;

        const makeDir = key => {
          const folder = req.body.name;
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const checkName = name => name.replace(/-/g, " ");

        project = {
          name: checkName(body.name),
          year: project.year,
          size: project.size,
          category: project.category,
          address: {
            country: project.address.country,
            city: project.address.city,
            street: project.address.street,
            houseNumber: project.address.houseNumber,
            zip: body.zip,
          },
          description: body.description,
          files: {
            contracts: project.files.contracts.map(i => {
              return { name: i.name, url: i.url };
            }),

            licensing: project.files.licensing.map(i => {
              return { name: i.name, url: i.url };
            }),

            experts: project.files.experts.map(i => {
              return {
                firstName: i.firstName,
                lastName: i.lastName,
                phone: i.phone,
                category: { text: i.category.text, value: i.category.value },
                file: {
                  name: i.file.name,
                  url: i.file.url,
                },
              };
            }),
          },

          images: {
            card: {
              url: body.cardUrl ? makeDir("cardUrl") : project.images.card.url,
              alt: body.cardAlt,
            },
            panorama: {
              url: body.urlPamorama
                ? body.urlPamorama
                : project.images.panorama.url,
              alt: body.altPamorama,
            },

            before: project.images.before.map(i => {
              return {
                url: i.url,
                alt: i.alt,
                description: i.description,
              };
            }),
            constraction: project.images.constraction.map(i => {
              return {
                url: i.url,
                alt: i.alt,
                description: i.description,
              };
            }),
            sketches: project.images.sketches.map(i => {
              return {
                url: i.url,
                alt: i.alt,
                description: i.description,
                remarks: i.remarks,
              };
            }),
            imaging: project.images.imaging.map(i => {
              return {
                url: i.url,
                alt: i.alt,
                description: i.description,
                remarks: i.remarks,
              };
            }),
            references: project.images.references.map(i => {
              return {
                url: i.url,
                alt: i.alt,
                remarks: i.remarks,
              };
            }),

            plans: project.images.plans.map(i => {
              return {
                url: i.url,
                alt: i.alt,
                remarks: i.remarks,
              };
            }),
            gallery: project.images.gallery.map(i => {
              return {
                url: i.url,
                alt: i.alt,
              };
            }),
          },
          userID: project.userID,
          isPublished: body.isPublished,
        };

        if (body.urlBefore !== undefined) {
          project.images.before.push({
            url: makeDir("urlBefore"),
            alt: body.altBefore,
            description: body.desBefore,
          });
        }

        if (body.urlConstraction !== undefined)
          project.images.constraction.push({
            url: makeDir("urlConstraction"),
            alt: body.altConstraction,
            description: body.desConstraction,
          });

        if (body.urlSketch !== undefined) {
          project.images.sketches.push({
            url: makeDir("urlSketch"),
            alt: body.altSketch,
            description: body.desSketch,
            remarks: "כאן ניתן לכתוב הערות",
          });
        }

        if (body.urlImaging !== undefined) {
          project.images.imaging.push({
            url: makeDir("urlImaging"),
            alt: body.altImaging,
            description: body.desImaging,
            remarks: "כאן ניתן לכתוב הערות",
          });
        }

        if (body.urlPlans !== undefined) {
          project.images.plans.push({
            url: makeDir("urlPlans"),
            alt: body.altPlans,
            remarks: "כאן ניתן לכתוב הערות",
          });
        }

        if (body.urlGallery !== undefined) {
          project.images.gallery.push({
            url: makeDir("urlGallery"),
            alt: body.altGallery,
          });
        }

        const { error } = validateProject(project);
        if (error) {
          console.log(error.details[0].message);
          return res.status(400).send(error.details[0].message);
        }

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          project
        );
        return res.send(project);
      } catch (error) {
        console.log(error.message);
        return res.status(400).send(error.message);
      }
    }
    return res.send("You are not authorized to change projects");
  }
);

/******************* Delete Project *********************/

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
  if ((req.user && req.user.isAdmin) | (req.user._id === req.params.id)) {
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

router.get("/:id", async (req, res) => {
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

router.patch("/changeLikeStatus/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
    let status = project.isLiked;
    let changeStatus = !status;
    project = await Project.findOneAndUpdate(
      { _id: req.params.id },
      { isLiked: changeStatus }
    );
    await project.save();
    res.send(project);
  }
});

const storageImage = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const project = await Project.findById({ _id: req.params.id });
    const name = project.name;
    const folder = name.replace(/\s/g, "-");
    storegePath(null, `public/images/projects/${folder}`);
  },
  filename: (req, file, setName) => setName(null, file.originalname),
});

const uploadImage = multer({
  storage: storageImage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter,
});

/************** Referances ****************/
router.patch(
  "/uploadReferance/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;
        const remarks = "לא מוגדר";

        const { error } = validateImage(req.body);
        if (error) return console.log(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "images.references": {
                url,
                alt,
                remarks,
              },
            },
          }
        );
        await project.save();

        const to = user.email;
        const subject = "Anu-architects send you a picture or a pdf file";
        const link = `http://localhost:3000/private-area/project/references/${project._id}`;
        const mail = {
          projectId: project._id,
          description: req.body.imageAlt,
          route: "references",
        };
        const html = generateTemplate(mail).sendImage;

        return mailReq(to, subject, link, html)
          .then(res.send("Email sent!"))
          .catch(error => res.status(404).send(error.message));
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add images!");
  }
);

router.patch("/delete-referance/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.references": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

router.patch("/edit-referance/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
      let array = project.images.references;

      const references = array.filter(image => {
        if (image._id == req.body.imageId) {
          image.remarks = req.body.remarks;
          return image;
        }
        return image;
      });

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.references": references,
        }
      );

      await project.save();

      let userId = project.userID;
      let user = await User.findById(userId);

      const to = "anu.arch.rl@gmail.com";
      const subject = "הלקוח העיר על התמונה שהעלית";
      const link = `http://localhost:3000/private-area/project/references/${project._id}`;
      const mail = {
        projectId: project._id,
        remarks: req.body.remarks,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        fild: "references",
      };
      const html = generateTemplate(mail).receiveComments;

      return mailReq(to, subject, link, html)
        .then(res.send("Email sent!"))
        .catch(error => res.status(404).send(error.message));
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

/************** Sketches ****************/

router.patch(
  "/uploadSketches/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;
        const remarks = "לא מוגדר";

        const { error } = validateImage(req.body);
        if (error) return console.log(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "images.sketches": {
                url,
                alt,
                remarks,
              },
            },
          }
        );
        await project.save();

        const to = user.email;
        const subject = "Anu-architects send you a picture or a pdf file";
        const link = `http://localhost:3000/private-area/project/sketches/${project._id}`;
        const mail = {
          projectId: project._id,
          description: req.body.imageAlt,
          route: "sketches",
        };
        const html = generateTemplate(mail).sendImage;

        return mailReq(to, subject, link, html)
          .then(res.send("Email sent!"))
          .catch(error => res.status(404).send(error.message));
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add images!");
  }
);

router.patch("/delete-sketches/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.sketches": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

router.patch("/edit-sketches/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
      let array = project.images.sketches;

      const sketches = array.filter(image => {
        if (image._id == req.body.imageId) {
          image.remarks = req.body.remarks;
          return image;
        }
        return image;
      });

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.sketches": sketches,
        }
      );

      await project.save();

      let userId = project.userID;
      let user = await User.findById(userId);

      const to = "anu.arch.rl@gmail.com";
      const subject = "הלקוח העיר על התמונה שהעלית";
      const link = `http://localhost:3000/private-area/project/sketches/${project._id}`;
      const mail = {
        projectId: project._id,
        remarks: req.body.remarks,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        fild: "sketches",
      };
      const html = generateTemplate(mail).receiveComments;

      return mailReq(to, subject, link, html)
        .then(res.send("Email sent!"))
        .catch(error => res.status(404).send(error.message));
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

/************** Imaging ****************/

router.patch(
  "/uploadImaging/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;
        const remarks = "לא מוגדר";

        const { error } = validateImage(req.body);
        if (error) return console.log(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "images.imaging": {
                url,
                alt,
                remarks,
              },
            },
          }
        );
        await project.save();

        const to = user.email;
        const subject = "Anu-architects send you a picture or a pdf file";
        const link = `http://localhost:3000/private-area/project/imaging/${project._id}`;
        const mail = {
          projectId: project._id,
          description: req.body.imageAlt,
          route: "imaging",
        };
        const html = generateTemplate(mail).sendImage;

        return mailReq(to, subject, link, html)
          .then(res.send("Email sent!"))
          .catch(error => res.status(404).send(error.message));
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add images!");
  }
);

router.patch("/delete-imaging/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.imaging": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

router.patch("/edit-imaging/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
      let array = project.images.imaging;

      const imaging = array.filter(image => {
        if (image._id == req.body.imageId) {
          image.remarks = req.body.remarks;
          return image;
        }
        return image;
      });

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.imaging": imaging,
        }
      );

      await project.save();

      let userId = project.userID;
      let user = await User.findById(userId);

      const to = "anu.arch.rl@gmail.com";
      const subject = "הלקוח העיר על התמונה שהעלית";
      const link = `http://localhost:3000/private-area/project/imaging/${project._id}`;
      const mail = {
        projectId: project._id,
        remarks: req.body.remarks,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        fild: "imaging",
      };
      const html = generateTemplate(mail).receiveComments;

      return mailReq(to, subject, link, html)
        .then(res.send("Email sent!"))
        .catch(error => res.status(404).send(error.message));
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

/************** Plans ****************/

router.patch(
  "/uploadPlans/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;
        const remarks = "לא מוגדר";

        const { error } = validateImage(req.body);
        if (error) return res.send(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "images.plans": {
                url,
                alt,
                remarks,
              },
            },
          }
        );
        await project.save();

        const to = user.email;
        const subject = "Anu-architects send you a picture or a pdf file";
        const link = `http://localhost:3000/private-area/project/plans/${project._id}`;
        const mail = {
          projectId: project._id,
          description: req.body.imageAlt,
          route: "plans",
        };
        const html = generateTemplate(mail).sendImage;

        return mailReq(to, subject, link, html)
          .then(res.send("Email sent!"))
          .catch(error => res.status(404).send(error.message));
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add images!");
  }
);

router.patch("/delete-plans/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.plans": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

router.patch("/edit-plans/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
      let array = project.images.plans;

      const plans = array.filter(image => {
        if (image._id == req.body.imageId) {
          image.remarks = req.body.remarks;
          return image;
        }
        return image;
      });

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.plans": plans,
        }
      );

      await project.save();

      let userId = project.userID;
      let user = await User.findById(userId);

      const to = "anu.arch.rl@gmail.com";
      const subject = "הלקוח העיר על התמונה שהעלית";
      const link = `http://localhost:3000/private-area/project/plans/${project._id}`;
      const mail = {
        projectId: project._id,
        remarks: req.body.remarks,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        fild: "plans",
      };
      const html = generateTemplate(mail).receiveComments;

      return mailReq(to, subject, link, html)
        .then(res.send("Email sent!"))
        .catch(error => res.status(404).send(error.message));
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

/************** Contracts ****************/

router.patch(
  "/uploadContracts/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;

        const { error } = validateImage(req.body);
        if (error) return res.send(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "files.contracts": {
                url,
                name: alt,
              },
            },
          }
        );
        await project.save();

        const to = user.email;
        const subject = "Anu-architects send you a picture or a pdf file";
        const link = `http://localhost:3000/private-area/project/contracts/${project._id}`;
        const mail = {
          projectId: project._id,
          description: req.body.imageAlt,
          route: "contracts",
        };
        const html = generateTemplate(mail).sendImage;

        return mailReq(to, subject, link, html)
          .then(res.send("Email sent!"))
          .catch(error => res.status(404).send(error.message));
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add files!");
  }
);

router.patch("/delete-contracts/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
      req.body.map(i => {
        const obj = {
          imageUrl: i.url,
          imageAlt: i.name,
        };
        const { error } = validateImage(obj);
        if (error) {
          console.log(error);
          return res.send(error.message);
        }
      });

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "files.contracts": req.body,
        }
      );
      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete files!");
});

/************** Licensing ****************/

router.patch(
  "/UploadLicensing/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;

        const { error } = validateImage(req.body);
        if (error) return res.send(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "files.licensing": {
                url,
                name: alt,
              },
            },
          }
        );
        await project.save();

        const to = user.email;
        const subject = "Anu-architects send you a picture or a pdf file";
        const link = `http://localhost:3000/private-area/project/licensing/${project._id}`;
        const mail = {
          projectId: project._id,
          description: req.body.imageAlt,
          route: "licensing",
        };
        const html = generateTemplate(mail).sendImage;

        return mailReq(to, subject, link, html)
          .then(res.send("Email sent!"))
          .catch(error => res.status(404).send(error.message));
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add files!");
  }
);

router.patch("/delete-licensing/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
      req.body.map(i => {
        const obj = {
          imageUrl: i.url,
          imageAlt: i.name,
        };
        const { error } = validateImage(obj);
        if (error) {
          console.log(error);
          return res.send(error.message);
        }
      });

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "files.licensing": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete files!");
});

/************** Experts ****************/

router.patch(
  "/createExpert/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;

        const { error } = validateExpert(req.body);
        if (error) {
          console.log(error.message);
          return res.send(error.message);
        }

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "files.experts": {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                category: {
                  text: req.body.categoryText,
                  value: req.body.category,
                },
                file: {
                  url,
                  name: alt,
                },
              },
            },
          }
        );
        await project.save();

        const to = user.email;
        const subject = "Anu-architects send you a picture or a pdf file";
        const link = `http://localhost:3000/private-area/project/experts/${project._id}`;
        const mail = {
          projectId: project._id,
          description: req.body.imageAlt,
          route: "experts",
        };
        const html = generateTemplate(mail).sendImage;

        return mailReq(to, subject, link, html)
          .then(res.send("Email sent!"))
          .catch(error => res.status(404).send(error.message));
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add files!");
  }
);

router.patch("/delete-expert/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

      req.body.map(i => {
        const obj = {
          firstName: i.firstName,
          lastName: i.lastName,
          phone: i.phone,
          category: i.category.value,
          categoryText: i.category.text,
          imageUrl: i.file.url,
          imageAlt: i.file.name,
        };
        const { error } = validateExpert(obj);
        if (error) {
          console.log(error);
          return res.send(error.message);
        }
      });

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "files.experts": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      console.log(error.message);
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete files!");
});

/************** Constraction ****************/
router.patch(
  "/uploadConstraction/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;
        const remarks = "לא מוגדר";

        const { error } = validateImage(req.body);
        if (error) return res.send(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "images.constraction": {
                url,
                alt,
                remarks,
              },
            },
          }
        );
        await project.save();
        return res.send(project);
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add images!");
  }
);

router.patch("/delete-constraction/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.constraction": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

/************** Before ****************/
router.patch(
  "/uploadBefore/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;
        const remarks = "לא מוגדר";

        const { error } = validateImage(req.body);
        if (error) return console.log(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "images.before": {
                url,
                alt,
                remarks,
              },
            },
          }
        );
        await project.save();
        return res.send(project);
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add images!");
  }
);

router.patch("/delete-before/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.before": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

/************** Gallery ****************/
router.patch(
  "/uploadGallery/:id",
  uploadImage.array("images"),
  auth,
  async (req, res) => {
    if (req.user && req.user.isAdmin) {
      try {
        let project = await Project.findById(req.params.id);
        if (!project)
          return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

        const userId = project.userID;
        user = await User.findById(userId);
        if (!user)
          return res.send("This project is not associated with a user");

        const name = project.name;
        const folder = name.replace(/\s/g, "-");
        const makeDir = (folder, key) => {
          const image = path.basename(req.body[key]);
          return `/images/projects/${folder}/${image}`;
        };

        const url = makeDir(folder, "imageUrl");
        const alt = req.body.imageAlt;
        const remarks = "לא מוגדר";

        const { error } = validateImage(req.body);
        if (error) return console.log(error.message);

        project = await Project.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              "images.gallery": {
                url,
                alt,
              },
            },
          }
        );
        await project.save();
        return res.send(project);
      } catch (error) {
        return res.status(404).send(error.message);
      }
    }
    return res.send("only admin can add images!");
  }
);

router.patch("/delete-gallery/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");

      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          "images.gallery": req.body,
        }
      );

      await project.save();
      return res.send(project);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
  return res.send("only admin can delete images!");
});

module.exports = router;
