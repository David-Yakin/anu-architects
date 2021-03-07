const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoName: {
    type: String,
    default: "none",
    required: true,
  },
  videoData: {
    type: String,
    required: true,
  },

//   id: {
//     type: String,
//     unique: true,
//   },

});
const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
