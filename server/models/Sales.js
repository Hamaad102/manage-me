const mongoose = require('mongoose');

const Schema = mongoose.Schema

const salesSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    item: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

const Sales = mongoose.model('sales', salesSchema)

module.exports = Sales
