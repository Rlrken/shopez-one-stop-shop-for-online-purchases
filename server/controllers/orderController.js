const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {

    try {

        const order = await Order.create(req.body);

        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Orders
exports.getOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("userId")
            .populate("products.productId");

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};