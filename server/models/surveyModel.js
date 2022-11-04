const mongoose = require('mongoose');

// const moment = require('moment-timezone');
// const dateIndia = moment.tz(Date.now(), "Asia/Bangkok");

// console.log(dateThailand); // "2018-08-20T16:35:14.033+07:00"
// *** Asia/Bangkok +07:00

const reqString ={
    type:String,
    require:true
}
// const locationSchema = mongoose.Schema(
//     {latitude:reqString,},
//     {longitude:reqString,}
//     );
const locationSchema = mongoose.Schema(
    {
        latitude:reqString,
        longitude:reqString,
    },
    // {longitude:reqString,},
    // {timestamps:true,}
)
const feedbackSchema = mongoose.Schema(
    {
        date:{type:"string", format: "date", required:true, default:new Date() },
        remark:reqString,
    }    
)
const surveySchema = mongoose.Schema({
//for username:match: [/^[a-zA-Z0-9]+$/, 'is invalid']
// username:{type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
//email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
//  location: {

//     type:{type:String},
//        coordinates:[]

//     },
// created_date: {type: Date, default: dateIndia},
survey_date:reqString,
staffname:{type: String, required: [true, "can't be blank"], match: [/[a-zA-Z]+$/, 'is invalid']},
survey_area:reqString,
feedback:[feedbackSchema],
// feedback:reqString,
position:[locationSchema],
},
{
    timestamps:true,
}
);
//surveySchema.index({location:"2dsphere"});
const Survey = mongoose.model("survey_form", surveySchema);
module.exports = Survey;
