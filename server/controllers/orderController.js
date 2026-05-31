const Order = require("../models/Order");
const Product = require("../models/Product");

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("userId")
            .populate("products.productId");
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["pending", "processing", "shipped", "delivered"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value." });
        }

        // Fetch current order to check previous status
        const existingOrder = await Order.findById(id);
        if (!existingOrder) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        const previousStatus = existingOrder.status;

        // Decrease stock only when transitioning INTO "processing" for the first time
        // This prevents double-deduction if admin saves "processing" multiple times
        if (status === "delivered" && previousStatus === "pending") {
            for (const item of existingOrder.products) {
                await Product.findByIdAndUpdate(
                    item.productId,
                    { $inc: { stock: -item.quantity } }
                );
            }
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate("userId").populate("products.productId");

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};