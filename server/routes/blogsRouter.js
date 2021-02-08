const express = require('express');
const { Blog, validateBlog } = require('../models/blog');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/blogs/blogs-search-page', async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

router.get('/blog/:id', async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  if (!blog) return res.status(404).send('המאמר לא נמצא במאגר המידע');
  res.send(blog);
});

router.get('/blogs', auth, async (req, res) => {
  if( !req.user.admin ) return res.status(401).send("Access Denied");
  const blogs = await Blog.find({ user_id: req.user._id });
  res.send(blogs);
});


router.delete('/:id', auth, async (req, res) => {
  const blog = await Blog.findOneAndRemove({ _id: req.params.id });
  if (!blog) return res.status(404).send('הבלוג לא נמצא במאגר המידע');
  res.send(blog);
});

router.put('/private-area/edit-blog-card/:id', auth, async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let blog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!blog) return res.status(404).send('The blog with the given ID was not found.');

  blog = await Blog.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(blog);

});

router.get('/private-area/edit-blog-card/:id', auth, async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  if (!blog) return res.status(404).send('The blog with the given ID was not found.');
  res.send(blog);
});

router.post('/', auth, async (req, res) => {
console.log(req.body);

  const { error } = validateBlog(req.body);
  if (error)return res.status(400).send(error.details[0].message);

  let blog = new Blog(
    {
        title: req.body.title,
        subTitle: req.body.subTitle,
        author: req.body.author,
        category: req.body.category,
        cardUrl: req.body.cardUrl,
        cardAlt: req.body.cardAlt,
        titleImgUrl: req.body.titleImgUrl,
        titleImgAlt: req.body.titleImgAlt,
        titleImgCredit: req.body.titleImgCredit,
        endImgUrl:req.body.endImgUrl,
        endImgAlt:req.body.endImgAlt,
        endImgCredit:req.body.endImgCredit,
        firstInnerTitle: req.body.firstInnerTitle,
        firstP: req.body.firstP,
        secondP: req.body.secondP,
        thirdP: req.body.thirdP,
        landscapeImgUrl: req.body.landscapeImgUrl,
        landscapeImgAlt: req.body.landscapeImgAlt,
        landscapeImgCredit: req.body.landscapeImgCredit,
        secondInnerTitle: req.body.secondInnerTitle,
        foruthP: req.body.foruthP,
        fifthP: req.body.fifthP,
        sixthP: req.body.sixthP,
        profileImgUrl: req.body.profileImgUrl,
        profileImgAlt: req.body.profileImgAlt,
        profileImgCredit: req.body.profileImgCredit,
        thirdInnerTitle: req.body.thirdInnerTitle,
        seventhP: req.body.seventhP,
        eighthP: req.body.eighthP,
        ninthP: req.body.ninthP,
    }
  );

  const post = await blog.save();
  res.send(post);

});

module.exports = router; 