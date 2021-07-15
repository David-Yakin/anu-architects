const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const string256R = {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 256,
};

const string1024R = {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 1024,
};

const schema = new mongoose.Schema({
  title: string256R,
  subTitle: string256R,
  author: string256R,
  category: {
    text: string256R,
    value: string256R,
  },
  cardUrl: string256R,
  cardAlt: string256R,
  titleImgUrl: string256R,
  titleImgAlt: string256R,
  titleImgCredit: string256R,
  endImgUrl: string256R,
  endImgAlt: string256R,
  endImgCredit: string256R,
  firstInnerTitle: string256R,
  firstP: string1024R,
  secondP: string1024R,
  thirdP: string1024R,
  landscapeImgUrl: string256R,
  landscapeImgAlt: string256R,
  landscapeImgCredit: string256R,
  secondInnerTitle: string256R,
  foruthP: string1024R,
  fifthP: string1024R,
  sixthP: string1024R,
  profileImgUrl: string256R,
  profileImgAlt: string256R,
  profileImgCredit: string256R,
  thirdInnerTitle: string256R,
  seventhP: string1024R,
  eighthP: string1024R,
  ninthP: string1024R,
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
});

const Blog = mongoose.model("Blog", schema);

function validateBlog(blog) {
  const schema = Joi.object({
    title: Joi.string().required().min(2).max(255),
    subTitle: Joi.string().min(2).max(255).required(),
    author: Joi.string().required().min(2).max(255),
    category: Joi.string().required().min(2).max(255),
    cardUrl: Joi.string().required().min(2).max(255),
    cardAlt: Joi.string().required().min(2).max(255),
    titleImgUrl: Joi.string().required().min(2).max(255),
    titleImgAlt: Joi.string().required().min(2).max(255),
    titleImgCredit: Joi.string().required().min(2).max(255),
    endImgUrl: Joi.string().required().min(2).max(255),
    endImgAlt: Joi.string().required().min(2).max(255),
    endImgCredit: Joi.string().required().min(2).max(255),
    firstInnerTitle: Joi.string().required().min(2).max(255),
    firstP: Joi.string().required().min(2).max(1024),
    secondP: Joi.string().min(2).max(1024).required(),
    thirdP: Joi.string().min(2).max(1024).required(),
    landscapeImgUrl: Joi.string().min(2).max(255).required(),
    landscapeImgAlt: Joi.string().min(2).max(255).required(),
    landscapeImgCredit: Joi.string().min(2).max(255).required(),
    secondInnerTitle: Joi.string().min(2).max(255).required(),
    foruthP: Joi.string().min(2).max(1024).required(),
    fifthP: Joi.string().min(2).max(1024).required(),
    sixthP: Joi.string().min(2).max(1024).required(),
    profileImgUrl: Joi.string().min(2).max(255).required(),
    profileImgAlt: Joi.string().min(2).max(255).required(),
    profileImgCredit: Joi.string().min(2).max(255).required(),
    thirdInnerTitle: Joi.string().min(2).max(255).required(),
    seventhP: Joi.string().min(2).max(1024).required(),
    eighthP: Joi.string().min(2).max(1024).required(),
    ninthP: Joi.string().min(2).max(1024).required(),
  });

  return schema.validate(blog);
}

exports.Blog = Blog;
exports.validateBlog = validateBlog;
