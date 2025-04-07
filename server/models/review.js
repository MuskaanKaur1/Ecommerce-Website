const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    productId: { type: String, required: true }, // Links review to a product
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
