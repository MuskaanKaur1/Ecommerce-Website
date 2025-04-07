const express = require("express");
const Review = require("../models/review");
const router = express.Router();

//  Get all reviews for a product
router.get("/:productId", async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});

//  Add a new review
router.post("/", async (req, res) => {
    try {
        const { productId, name, email, rating, comment } = req.body;
        console.log("Incoming Review Data:", req.body); //  Debugging

        if (!productId || !name || !email || !rating || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newReview = new Review({ productId, name, email, rating, comment });
        await newReview.save();
        console.log("Review saved to DB:", newReview); //  Debugging
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).json({ error: "Failed to add review" });
    }
});



module.exports = router;
