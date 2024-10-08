const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
