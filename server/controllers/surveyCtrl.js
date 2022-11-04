const Survey = require("../models/surveyModel")

const getSurveyData = async(req, res) =>{
    try {
     const surveydata =  await Survey.find();
        res.json(surveydata)
    } catch (error) {
        console.log(error);
    }
};
// add-new-user Method:POST
const addSurveyData =async(req,res)=>{
    const newSurvey =  new Survey({
        survey_date:req.body.survey_date ,
        staffname:req.body.staffname,
        survey_area:req.body.survey_area,
        // feedback:req.body.feedback,
        feedback:[
           { remark:req.body.feedback}
        ],
        //  location:{
        //      type:"Point",
        //      coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
        //  }
    // latitude:parseFloat(req.body.longitude),
    // longitude:parseFloat(req.body.latitude)
        // location:[
        //     {latitude:req.body.latitude},
        //     {longitude:req.body.longitude},
        //     {longitude:"location"},
        // ] ,      
        position:[
        {latitude:req.body.latitude,
        longitude:req.body.longitude},          
       ]

    });
    await newSurvey.save();
    res.json(newSurvey)

}
// delete user
const deleteSurveyData =async(req,res)=>{
    try {
     
        await Survey.deleteOne({_id:req.params.id})
        res.send("deleted")
    } catch (error) {
        console.log("error in Delete ctrl", error.message);
    }
}

// update user
const updateSurveyData = async(req,res)=>{
    try {
        const user = await Survey.findByIdAndUpdate(req.params.id, 
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
module.exports = {getSurveyData, addSurveyData,deleteSurveyData,updateSurveyData};