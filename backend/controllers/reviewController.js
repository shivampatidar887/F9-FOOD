const Review= require("../models/reviewModel");
const errorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// Create new Review or update previous if any
exports.createReview = catchAsyncErrors(async(req,res,next)=>{
    const isreviewed = await Review.findOne({ user: req.user._id });
    if(!isreviewed){
    req.body.user = req.user.id;                                // for the maker of the product
    const review= await Review.create(req.body);
    res.status(201).json({
        success:true,
        review,
     })
     }
    else{
        const newdata={
            description:req.body.description,
            rating:req.body.rating,
            createdAt:Date.now(),
        }
        const review = await Review.findOneAndUpdate({ user: req.user._id },newdata,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
           });
           res.status(201).json({
            success:true,
            review,
         })
    }
    
  
});
// Get all Reviews
exports.getAllReviews = catchAsyncErrors(async(req,res,next) =>{
    const reviewCount = await Review.countDocuments();
    const reviews= await Review.find();
    res.status(200).json({
     success:true,
     reviews,
     reviewCount,
    })
});
// Delete Review (admin)
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const review = await Review.findById(req.params.id);
    if(!review){
        return next(new errorHandler("Review Not FOund",404));
    }
    await review.remove();
    res.status(200).json({
        success:true,
        message:"Review deleted Successfully"
    })
});