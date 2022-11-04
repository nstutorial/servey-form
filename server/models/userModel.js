const mongoose = require("mongoose");
const reqString = {
  type:String,
  require:true
}
const userSchema = mongoose.Schema({
  staffname:reqString,
  fathername:reqString,
  address:reqString,
  mobilenumber:reqString,
  adhar:reqString,
  email:reqString,
  doj:reqString,
  username:reqString,
  password:reqString,
 
  role:{
    type:Number,
    default:0
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;