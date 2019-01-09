const mongoose = require('mongoose');

const broneSchema = mongoose.Schema
({
    timestamp: { type: Number , default: Date.now(), unique:true },
    brone_time: { type: String, unique:true },
    name: { type: String },
    phone: { type: String },
    price: { type: String },
    email: { type: String },
    quantity: { type: String },
    time: { type: String },
    quest_name: { type: String },
    company_name: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('brone', broneSchema);
