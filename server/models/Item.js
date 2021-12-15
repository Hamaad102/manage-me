const mongoose = require('mongoose');

const Schema = mongoose.Schema

const itemSchema = new Schema({
    category: {
        type: String,
        required: [true, 'Please enter a category'],
        lowercase: true
    },
    name: {
        type: String,
        required: [true, 'Please enter an item'],
        lowercase: true
    },
    cost: {
        type: Number,
        required: [true, 'Please enter a cost']
    },
    units: {
        type: Number,
        required: [true, 'Please enter number of units']
    },
    tags: {
        type: Array,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Item = mongoose.model('items', itemSchema)

module.exports = Item



