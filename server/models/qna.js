const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const string255 = { type: String,  required: true,  minlength: 2,  maxlength: 255 }

const qnaSchema = new mongoose.Schema({
    question: string255,
    answer:{
      title: string255,
      text:string255,
    },
    open: {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
});

const Qna = mongoose.model('Qna', qnaSchema);

function validateQna(qna) {
const qnaSchema = Joi.object({
  question: Joi.string().required().min(2).max(255),
  answer: {
    title: Joi.string().required().min(2).max(255),
    text:Joi.string().required().min(2).max(255),
  }})

  return qnaSchema.validate(qna);
}

exports.Qna = Qna;
exports.validateQna = validateQna;