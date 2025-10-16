const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new Schema({
  name : [{
    type : String,
    required : true, 
  }],
  email : [{
    type : String,
    required : true, 
  }],
  password : [{
    type : String,
    required : true, 
  }],
  timeStamp : {
    type : Date,
    default : Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now // Sets the default to the current timestamp when a new document is created
  }
});

module.exports = mongoose.model("user", UserSchema);