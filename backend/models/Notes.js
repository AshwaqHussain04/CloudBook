const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  title: [
    {
      type: String,
      required: true,
    },
  ],
  description: [
    {
      type: String,
      required: true,
    },
  ],
  importance: [
    {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  ],
  timeStamp: [
    {
      type: Date,
      default: Date.now,
    },
  ],
});

module.exports = mongoose.model("notes", NoteSchema);
