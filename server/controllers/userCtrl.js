const User = require("../models/userModel")

const getAllUser = async(req, res) =>{
    try {
     const users =  await User.find();
        res.json(users)
    } catch (error) {
        console.log(error);
    }
};
// add-new-user Method:POST
const addUser =async(req,res)=>{
    const {staffname,fathername,address,mobilenumber,adhar,email,doj,username,password} = req.body;
    const newUser =await new User({staffname,fathername,address,mobilenumber,adhar,email,doj,username,password})
    await newUser.save();
    res.json(newUser)

}
// delete user
const deleteUser =async(req,res)=>{
    try {
     
        await User.deleteOne({_id:req.params.id})
        res.send("deleted")
    } catch (error) {
        console.log("error in Delete ctrl", error.message);
    }
}

// update user
const updateUser = async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, 
          req.body, { new: true, runValidators: true })
          console.log(user);
        if (!user) {
          return res.status(404).send({ message: 'You do not seem to be registered' })
        }
       
        res.status(201).send(user)
      } catch (error) {
        res.status(400).send(error)
      }
}
module.exports = {getAllUser, addUser,deleteUser,updateUser};