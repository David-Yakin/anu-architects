// const router = require("express").Router();
// const multer = require("multer");
// const fs = require('fs');

// const storage = multer.diskStorage({
//   destination: function (req, file, saveToFolder) {
//     console.log(file);
//     const projectName = req.body.projectName;
//     const folder = req.params.folder;
//     if (!fs.existsSync(folder)){
//       fs.mkdirSync(folder)
//     }
//     if (!fs.existsSync(projectName)){
//       fs.mkdirSync(projectName)
//     }
//     saveToFolder( null, `./public/images/${folder}/${projectName}`);
//     },
//   filename: function (req, file, fileName) {
//     fileName( null, file.originalname );
//   },
// });

// const checkFileType = (req, file, isFileTypeCorrect) => {
//  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') return isFileTypeCorrect( null, true );
//  return isFileTypeCorrect( null, false );
// }

// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1920 * 1080 * 4},
//   fileFilter: checkFileType
// });

// router.post('/:folder', upload.single('arrayOfImages'), (req, res, next) => {

//   // const { error } = validateImage(req.body);
//   // if (error) return res.status(400).send(error.details[0].message);




//   // image.save().then((res) => {
//   //   return res.status(200).send(image);
//   // }).catch((error)=> {
//   //   console.log(error);
//   // res.send(error.details[0].message);
  
//   })})


// module.exports = router;
