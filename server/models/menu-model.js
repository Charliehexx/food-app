import mongoose, { Document } from "mongoose";



const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
}, { timestamps: true });

export const Menu = mongoose.model("Menu", menuSchema);