const express = require("express");
const { Blog, validateBlog } = require("../models/blog");
const auth = require("../middleware/auth");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const title = req.body.title;
    const projectFind = await Blog.findOne({ title });
    if (projectFind) return storegePath("המאמר כבר נמצא במאגר המידע");
    const titleLowerCase = title.toLowerCase();

    if (!fs.existsSync(`public/images/blogs/${titleLowerCase}`)) {
      fs.mkdirSync(`public/images/blogs/${titleLowerCase}`);
    }
    storegePath(null, `public/images/blogs/${titleLowerCase}`);
  },
  filename: (req, file, setName) => {
    setName(null, file.originalname);
  },
});

const storageFromEditFile = multer.diskStorage({
  destination: async (req, file, storegePath) => {
    const title = req.body.title;
    const titleLowerCase = title.toLowerCase();
    storegePath(null, `public/images/blogs/${titleLowerCase}`);
  },
  filename: (req, file, setName) => {
    setName(null, file.originalname);
  },
});

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

const checkTitle = title => {
  return title.replace(/-/g, " ");
};

router.post("/", upload.array("images", 20), auth, async (req, res) => {
  if (req.user && req.user.isBloger === true) {
    const title = req.body.title;
    const titleLowerCase = title.toLowerCase();
    const currectTitle = checkTitle(titleLowerCase);

    const cardImage = path.basename(req.body.cardUrl);
    const cardDir = `/images/blogs/${titleLowerCase}/${cardImage}`;
    const titleImage = path.basename(req.body.titleImgUrl);
    const titleDir = `/images/blogs/${titleLowerCase}/${titleImage}`;
    const endImage = path.basename(req.body.endImgUrl);
    const endDir = `/images/blogs/${titleLowerCase}/${endImage}`;
    const landscapeImage = path.basename(req.body.landscapeImgUrl);
    const landscapeDir = `/images/blogs/${titleLowerCase}/${landscapeImage}`;
    const profileImage = path.basename(req.body.profileImgUrl);
    const profileDir = `/images/blogs/${titleLowerCase}/${profileImage}`;

    let blog = {
      title: currectTitle,
      subTitle: req.body.subTitle,
      author: req.body.author,
      category: req.body.category,
      cardUrl: cardDir,
      cardAlt: req.body.cardAlt,
      titleImgUrl: titleDir,
      titleImgAlt: req.body.titleImgAlt,
      titleImgCredit: req.body.titleImgCredit,
      endImgUrl: endDir,
      endImgAlt: req.body.endImgAlt,
      endImgCredit: req.body.endImgCredit,
      firstInnerTitle: req.body.firstInnerTitle,
      firstP: req.body.firstP,
      secondP: req.body.secondP,
      thirdP: req.body.thirdP,
      landscapeImgUrl: landscapeDir,
      landscapeImgAlt: req.body.landscapeImgAlt,
      landscapeImgCredit: req.body.landscapeImgCredit,
      secondInnerTitle: req.body.secondInnerTitle,
      foruthP: req.body.foruthP,
      fifthP: req.body.fifthP,
      sixthP: req.body.sixthP,
      profileImgUrl: profileDir,
      profileImgAlt: req.body.profileImgAlt,
      profileImgCredit: req.body.profileImgCredit,
      thirdInnerTitle: req.body.thirdInnerTitle,
      seventhP: req.body.seventhP,
      eighthP: req.body.eighthP,
      ninthP: req.body.ninthP,
    };
    const { error } = validateBlog(blog);
    if (error) return res.status(400).send(error.details[0].message);

    blog = new Blog(blog);
    await blog.save();
    return res.send("המאמר נשמר בהצלחה!");
  }
  return res.send("You are not authorized to create blogs");
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user && req.user.isBloger === true) {
    let blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) return res.status(404).send("הבלוג לא נמצא במאגר המידע");
    const newTitle = blog.title.replace(/\s/g, "-");

    fs.readdir(`public/images/blogs/${newTitle}`, (err, files) => {
      for (let file of files) {
        fs.unlinkSync(`public/images/blogs/${newTitle}/${file}`);
      }
      fs.rmdirSync(`public/images/blogs/${newTitle}`);
    });

    blog = await Blog.findOneAndRemove({ _id: req.params.id });
    return res.send("המאמר נמחק");
  }
  return res.send("You are not authorized to delete blogs");
});

router.put("/private-area/edit-blog-card/:id", auth, async (req, res) => {
  if (req.user && req.user.isBloger === true) {
    const { error } = validateBlog(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let blog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!blog)
      return res.status(404).send("The blog with the given ID was not found.");

    blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
  }
  return res.send("You are not authorized to change blogs");
});

const checkPath = (reqDir, projectDir) => {
  if (reqDir === projectDir) return projectDir;
  return reqDir;
};

router.put(
  "/:id",
  uploadFromEditFile.array("images", 20),
  auth,
  async (req, res) => {
    if (req.user && req.user.isBloger === true) {
      let blog = await Blog.findOne({ _id: req.body.id });
      if (!blog) return res.status(404).send("המאמר לא נמצא במאגר המידע");

      const title = req.body.title;
      const titleLowerCase = title.toLowerCase();

      const cardImage = path.basename(req.body.cardUrl);
      const reqCardDir = `/images/blogs/${titleLowerCase}/${cardImage}`;
      const cardDir = checkPath(reqCardDir, blog.cardUrl);
      const titleImage = path.basename(req.body.titleImgUrl);
      const reqTitleDir = `/images/blogs/${titleLowerCase}/${titleImage}`;
      const titleDir = checkPath(reqTitleDir, blog.titleImgUrl);
      const endImgUrl = path.basename(req.body.endImgUrl);
      const reqEndDir = `/images/blogs/${titleLowerCase}/${endImgUrl}`;
      const endDir = checkPath(reqEndDir, blog.endImgUrl);
      const landscapeImgUrl = path.basename(req.body.landscapeImgUrl);
      const reqLandscapeDir = `/images/blogs/${titleLowerCase}/${landscapeImgUrl}`;
      const landscapeDir = checkPath(reqLandscapeDir, blog.landscapeImgUrl);
      const profileImgUrl = path.basename(req.body.profileImgUrl);
      const reqProfileDir = `/images/blogs/${titleLowerCase}/${profileImgUrl}`;
      const profileDir = checkPath(reqProfileDir, blog.profileImgUrl);

      blog = {
        title: req.body.title,
        subTitle: req.body.subTitle,
        author: req.body.author,
        category: req.body.category,
        cardUrl: cardDir,
        cardAlt: req.body.cardAlt,
        titleImgUrl: titleDir,
        titleImgAlt: req.body.titleImgAlt,
        titleImgCredit: req.body.titleImgCredit,
        endImgUrl: endDir,
        endImgAlt: req.body.endImgAlt,
        endImgCredit: req.body.endImgCredit,
        firstInnerTitle: req.body.firstInnerTitle,
        firstP: req.body.firstP,
        secondP: req.body.secondP,
        thirdP: req.body.thirdP,
        landscapeImgUrl: landscapeDir,
        landscapeImgAlt: req.body.landscapeImgAlt,
        landscapeImgCredit: req.body.landscapeImgCredit,
        secondInnerTitle: req.body.secondInnerTitle,
        foruthP: req.body.foruthP,
        fifthP: req.body.fifthP,
        sixthP: req.body.sixthP,
        profileImgUrl: profileDir,
        profileImgAlt: req.body.profileImgAlt,
        profileImgCredit: req.body.profileImgCredit,
        thirdInnerTitle: req.body.thirdInnerTitle,
        seventhP: req.body.seventhP,
        eighthP: req.body.eighthP,
        ninthP: req.body.ninthP,
      };
      const { error } = validateBlog(blog);
      if (error) return res.status(400).send(error.details[0].message);

      blog = await Blog.findOneAndUpdate({ _id: req.body.id }, blog);
      blog = await Blog.findOne({ _id: req.body.id });
      return res.send(blog);
    }
    return res.send("You are not authorized to change blogs");
  }
);

router.get("/private-area/edit-blog-card/:id", auth, async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  if (!blog)
    return res.status(404).send("The blog with the given ID was not found.");
  res.send(blog);
});

router.get("/blogs/blogs-search-page", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

router.get("/blog/:id", async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  if (!blog) return res.status(404).send("המאמר לא נמצא במאגר המידע");
  res.send(blog);
});

router.get("/blogs", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(401).send("Access Denied");
  const blogs = await Blog.find({ user_id: req.user._id });
  res.send(blogs);
});

router.patch("/changePublishStatus/:id", auth, async (req, res) => {
  if (req.user && req.user.isAdmin) {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("הפרויקט לא נמצא במאגר המידע");
    let status = blog.isPublished;
    let changeStatus = !status;
    blog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { isPublished: changeStatus }
    );
    await blog.save();
    res.send(blog);
  }
});

module.exports = router;
