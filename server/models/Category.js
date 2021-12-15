const mongoose = require('mongoose');

const Schema = mongoose.Schema

const categorySchema = new Schema({
    category: {
        type: Array,
        required: [true, 'Please enter a category'],
        lowercase: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Category = mongoose.model('categories', categorySchema)

module.exports = Category
