const { Blog } = require("../models/blog");
const { Project } = require("../models/project");
const { Resume } = require("../models/resume");
const { User } = require("../models/user");
const { Qna } = require("../models/qna");
const bcrypt = require("bcrypt");

async function primaryProjects(project) {
  project = new Project(project);
  await project.save();
}

async function primaryResumes({
  firstName,
  subTitle,
  profileUrl,
  profileAlt,
  firstP,
  lastName,
  secondp,
  thirdP,
  fourthP,
}) {
  let resume = new Resume({
    firstName,
    subTitle,
    profileUrl,
    profileAlt,
    firstP,
    secondp,
    thirdP,
    fourthP,
    lastName,
  });
  await resume.save();
}

async function primaryQnas({ answer, question, open }) {
  let qna = new Qna({ answer, question, open });
  await qna.save();
}

async function primaryUsers({
  userID,
  firstName,
  lastName,
  email,
  phone,
  address: { country, city, street, houseNumber, zip },
  password,
  isAdmin,
  isBloger,
}) {
  let user = new User({
    userID,
    firstName,
    lastName,
    email,
    phone,
    address: { country, city, street, houseNumber, zip },
    password,
    isAdmin,
    isBloger,
  });
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
}
async function primaryBlogs({
  title,
  subTitle,
  author,
  category,
  cardUrl,
  cardAlt,
  titleImgUrl,
  titleImgAlt,
  titleImgCredit,
  endImgUrl,
  endImgAlt,
  endImgCredit,
  firstInnerTitle,
  firstP,
  secondP,
  thirdP,
  landscapeImgUrl,
  landscapeImgAlt,
  landscapeImgCredit,
  secondInnerTitle,
  foruthP,
  fifthP,
  sixthP,
  profileImgUrl,
  profileImgAlt,
  profileImgCredit,
  thirdInnerTitle,
  seventhP,
  eighthP,
  ninthP,
}) {
  const blog = new Blog({
    title,
    subTitle,
    author,
    category,
    cardUrl,
    cardAlt,
    titleImgUrl,
    titleImgAlt,
    titleImgCredit,
    endImgUrl,
    endImgAlt,
    endImgCredit,
    firstInnerTitle,
    firstP,
    secondP,
    thirdP,
    landscapeImgUrl,
    landscapeImgAlt,
    landscapeImgCredit,
    secondInnerTitle,
    foruthP,
    fifthP,
    sixthP,
    profileImgUrl,
    profileImgAlt,
    profileImgCredit,
    thirdInnerTitle,
    seventhP,
    eighthP,
    ninthP,
  });
  await blog.save();
}

exports.primaryProjects = primaryProjects;
exports.primaryResumes = primaryResumes;
exports.primaryBlogs = primaryBlogs;
exports.primaryUsers = primaryUsers;
exports.primaryQnas = primaryQnas;
