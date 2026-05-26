const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter food name"],
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },

    description: {
        type: String,
    },

    isAvailable: {
        type: Boolean,
        default: true,
    },

    rating: {
        type: Number,
        default: 0,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Food", foodSchema);