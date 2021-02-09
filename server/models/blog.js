const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, maxlength: 255},
    subTitle: { type: String, required: true, minlength: 2, maxlength: 255},
    author: { type: String, required: true, minlength: 2, maxlength: 255},
    category: { type: String, required: true, minlength: 2, maxlength: 255},
    cardUrl:{ type: String, required: true, minlength: 2, maxlength: 255},
    cardAlt:{ type: String, required: true, minlength: 2, maxlength: 255},
    titleImgUrl: { type: String, required: true, minlength: 2, maxlength: 255},
    titleImgAlt: { type: String, required: true, minlength: 2, maxlength: 255},
    titleImgCredit: { type: String, required: true, minlength: 2, maxlength: 255},
    endImgUrl: { type: String, required: true, minlength: 2, maxlength: 255},
    endImgAlt: { type: String, required: true, minlength: 2, maxlength: 255},
    endImgCredit: { type: String, required: true, minlength: 2, maxlength: 255},
    firstInnerTitle: { type: String, required: true, minlength: 2, maxlength: 255},
    firstP: { type: String, required: true, minlength: 2, maxlength: 1024},
    secondP: { type: String, required: true, minlength: 2, maxlength: 1024},
    thirdP: { type: String, required: true, minlength: 2, maxlength: 1024},
    landscapeImgUrl: { type: String, required: true, minlength: 2, maxlength: 255},
    landscapeImgAlt: { type: String, required: true, minlength: 2, maxlength: 255},
    landscapeImgCredit: { type: String, required: true, minlength: 2, maxlength: 255},
    secondInnerTitle: { type: String, required: true, minlength: 2, maxlength: 255},
    foruthP: { type: String, required: true, minlength: 2, maxlength: 1024},
    fifthP: { type: String, required: true, minlength: 2, maxlength: 1024},
    sixthP: { type: String, required: true, minlength: 2, maxlength: 1024},
    profileImgUrl: { type: String, required: true, minlength: 2, maxlength: 255},
    profileImgAlt: { type: String, required: true, minlength: 2, maxlength: 255},
    profileImgCredit: { type: String, required: true, minlength: 2, maxlength: 255},
    thirdInnerTitle: { type: String, required: true, minlength: 2, maxlength: 255},
    seventhP: { type: String, required: true, minlength: 2, maxlength: 1024},
    eighthP: { type: String, required: true, minlength: 2, maxlength: 1024},
    ninthP: { type: String, required: true, minlength: 2, maxlength: 1024},
    createdAt: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Blog = mongoose.model('Blog', blogSchema);

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
    endImgUrl:  Joi.string().required().min(2).max(255),
    endImgAlt:  Joi.string().required().min(2).max(255),
    endImgCredit:  Joi.string().required().min(2).max(255),
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
