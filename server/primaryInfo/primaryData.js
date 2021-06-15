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

async function primaryResumes(resume) {
  resume = new Resume(resume);
  await resume.save();
}

async function primaryQnas(qna) {
  qna = new Qna(qna);
  await qna.save();
}

async function primaryUsers(user) {
  user = new User(user);
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
}
async function primaryBlogs(blog) {
  blog = new Blog(blog);
  await blog.save();
}

exports.primaryProjects = primaryProjects;
exports.primaryResumes = primaryResumes;
exports.primaryBlogs = primaryBlogs;
exports.primaryUsers = primaryUsers;
exports.primaryQnas = primaryQnas;
