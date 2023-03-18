const mongoose  = require("mongoose");

const reviewSchema = new mongoose.Schema({
description:{
    type:String,
    required:[true,"Please Write description"],
    minLength:[6,"description has been more than 6 words"],
    maxLength:[500,"description can not exceed 500 words"],
},
rating:{
    type:Number,
    required:[true,"Please Give Rating"],
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
},
createdAt:{
    type:Date,
    default:Date.now,
},
});
module.exports = mongoose.model("Review",reviewSchema);