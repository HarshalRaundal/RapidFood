const mongoose = require('mongoose');

const {Schema} = mongoose;

const ordersScehma = new Schema({
    email : {
        type:String,
        unique : true,
        required: true
    },
    orders : {
        type :Array,
        required : true

    }
});

module.exports = mongoose.model('orders' , ordersScehma);