const { Blog } = require('../models/blog');
const { Project } = require('../models/project');
const { Resume } = require('../models/resume');
const { User } = require('../models/user');
const { Qna } = require('../models/qna');

async function primaryProjects({ 
    name, year, size, category, description, country, city, cardUrl, cardAlt, urlPamorama, altPamorama, urlBefore, altBefore, desBefore, urlSketch, altSketch, desSketch, urlImaging, altImaging, desImaging, urlConstraction, altConstraction, desConstraction, urlGallery, altGallery, user_id
}) {
    let project = new Project({
    name, year, size, category, description, country, city, cardUrl, cardAlt, urlPamorama, altPamorama, urlBefore, altBefore, desBefore, urlSketch, altSketch, desSketch, urlImaging, altImaging, desImaging, urlConstraction, altConstraction, desConstraction, urlGallery, altGallery, user_id
    });
    await project.save();
}

async function primaryResumes({ firstName, subTitle, profileUrl, profileAlt, firstP,lastName, secondp, thirdP, fourthP }){
    let resume = new Resume({
        firstName, subTitle, profileUrl, profileAlt, firstP, secondp, thirdP, fourthP, lastName   
    });
    await resume.save(); 
}

async function primaryQnas({ answer, question, open }){
    let qna = new Qna({ answer, question, open });
    await qna.save(); 
}

async function primaryUsers({ userID, name, lastName, email, phone,
    adress: { country, city, street, houseNumber , zip, }, password, admin, isBloger, isProjectManager}){
let user = new User({
    userID, name, lastName, email, phone,
    adress: { country, city, street, houseNumber , zip, }, password, admin, isBloger, isProjectManager
})
await user.save(); 
}
async function primaryBlogs({ 
    title, subTitle, author, category, cardUrl, cardAlt, titleImgUrl, titleImgAlt, titleImgCredit, endImgUrl, endImgAlt, endImgCredit, firstInnerTitle, firstP, secondP, thirdP, landscapeImgUrl, landscapeImgAlt, landscapeImgCredit, secondInnerTitle, foruthP, fifthP, sixthP, profileImgUrl, profileImgAlt, profileImgCredit, thirdInnerTitle, seventhP, eighthP, ninthP,
 }){
    const blog = new Blog({
        title, subTitle, author, category, cardUrl, cardAlt, titleImgUrl, titleImgAlt, titleImgCredit, endImgUrl, endImgAlt, endImgCredit, firstInnerTitle, firstP, secondP, thirdP, landscapeImgUrl, landscapeImgAlt, landscapeImgCredit, secondInnerTitle, foruthP, fifthP, sixthP, profileImgUrl, profileImgAlt, profileImgCredit, thirdInnerTitle, seventhP, eighthP, ninthP,
    })
    await blog.save(); 
}


exports.primaryProjects = primaryProjects;
exports.primaryResumes = primaryResumes;
exports.primaryBlogs = primaryBlogs;
exports.primaryUsers = primaryUsers;
exports.primaryQnas = primaryQnas;
