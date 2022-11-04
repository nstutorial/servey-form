const express = require("express");
const { getAllUser, addUser,deleteUser,updateUser } = require("../controllers/userCtrl");

// routes router object
const router = express.Router();


//get user method get
router.get("/",getAllUser);

//post user method post
router.post("/add-user",addUser);

//delete user
router.delete("/delete-user/:id",deleteUser);

//Update user
router.put("/update-user/:id",updateUser);


// export routes
module.exports = router