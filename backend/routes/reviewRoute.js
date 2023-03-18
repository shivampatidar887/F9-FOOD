const express = require("express");
const { createReview, getAllReviews, deleteReview } = require("../controllers/reviewController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router= express.Router();

router.route("/review/new").post(isAuthenticatedUser,createReview);
router.route("/reviews").get(getAllReviews);
router.route("/admin/review/:id").delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview);
module.exports = router