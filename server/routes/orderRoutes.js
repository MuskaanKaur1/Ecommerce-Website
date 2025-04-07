const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Import Order model

// Create Order
router.post("/place-order", async (req, res) => {
    try {
        const { user, cartItems, totalPrice, address } = req.body;

        console.log("Cart Items before placing order:", cartItems);

        // Validation
        if (!user || !cartItems || !totalPrice || !address) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Ensure `id` exists in all `cartItems`
        const hasValidIds = cartItems.every(item => item.id || item._id);
        if (!hasValidIds) {
            return res.status(400).json({ message: "Each cart item must have an `id` field." });
        }

        // Save order to DB
        const newOrder = new Order({
            user,
            cartItems: cartItems.map(item => ({
                productId: item.id || item._id,  // ✅ Ensure correct product ID field
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                quantity: item.quantity
            })),
            totalPrice,
            address,
            status: "Pending",
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });

    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: error.message || "Server error. Try again later." });
    }
});


// Get All Orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate("user cartItems.product");
        res.json(orders);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
