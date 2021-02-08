const { Blog } = require('../models/blog');
const { Project } = require('../models/project');
const { Resume } = require('../models/resume');
const { User } = require('../models/user');

async function primaryProjects({ 
    name, year, size, category, description, country, city, cardUrl, cardAlt, urlPamorama, altPamorama, urlBefore, altBefore, desBefore, urlSketch, altSketch, desSketch, urlImaging, altImaging, desImaging, urlConstraction, altConstraction, desConstraction, urlGallery, altGallery, user_id
}) {
    let project = new Project({
    name, year, size, category, description, country, city, cardUrl, cardAlt, urlPamorama, altPamorama, urlBefore, altBefore, desBefore, urlSketch, altSketch, desSketch, urlImaging, altImaging, desImaging, urlConstraction, altConstraction, desConstraction, urlGallery, altGallery, user_id
    });
    await project.save();
}

async function primaryResumes({ title, subTitle, profileUrl, profileAlt, firstP, secondp, thirdP, fourthP }){
    let resume = new Resume({
      title, subTitle, profileUrl, profileAlt, firstP, secondp, thirdP, fourthP   
    });
    await resume.save(); 
}

async function primaryBlogs({ 
    title, subTitle, author, category, cardUrl, cardAlt, titleImgUrl, titleImgAlt, titleImgCredit, endImgUrl, endImgAlt, endImgCredit, firstInnerTitle, firstP, secondP, thirdP, landscapeImgUrl, landscapeImgAlt, landscapeImgCredit, secondInnerTitle, foruthP, fifthP, sixthP, profileImgUrl, profileImgAlt, profileImgCredit, thirdInnerTitle, seventhP, eighthP, ninthP,
 }){
    const blog = new Blog({
        title, subTitle, author, category, cardUrl, cardAlt, titleImgUrl, titleImgAlt, titleImgCredit, endImgUrl, endImgAlt, endImgCredit, firstInnerTitle, firstP, secondP, thirdP, landscapeImgUrl, landscapeImgAlt, landscapeImgCredit, secondInnerTitle, foruthP, fifthP, sixthP, profileImgUrl, profileImgAlt, profileImgCredit, thirdInnerTitle, seventhP, eighthP, ninthP,
    })
    await blog.save(); 
}

async function primaryUsers({ name,lastName, email,phone,password,admin,isBloger}){
let user = new User({
    name,lastName, email,phone,password,admin,isBloger
})
await user.save(); 
}

exports.primaryProjects = primaryProjects;
exports.primaryResumes = primaryResumes;
exports.primaryBlogs = primaryBlogs;
exports.primaryUsers = primaryUsers;
