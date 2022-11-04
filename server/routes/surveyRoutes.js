const express = require("express");
const { getSurveyData, addSurveyData,deleteSurveyData,updateSurveyData } = require("../controllers/surveyCtrl");

// routes router object
const router = express.Router();


//get user method get
router.get("/",getSurveyData);

//post user method post
router.post("/add-servey-data",addSurveyData);

//delete user
router.delete("/delete-servey/:id",deleteSurveyData);

//Update user
router.put("/update-servey/:id",updateSurveyData);


// export routes
module.exports = router