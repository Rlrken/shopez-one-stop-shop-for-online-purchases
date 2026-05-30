const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],

    shippingAddress: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered"],
        default: "pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
