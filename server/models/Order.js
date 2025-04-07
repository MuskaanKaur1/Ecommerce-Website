const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Change "product" to "id"
            name: { type: String, required: true },
            price: { type: Number, required: true },
            imageUrl: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true }, // Add address field
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Order", orderSchema);
