const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const CaseSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    type: {type: String, required: true},
    image: {type: String, required: true},
    items: [{type: Object, required: true}],

    bonus: {type: Number, required: false},

    event: {type: String, required: false},
})

module.exports = mongoose.model("Cases", CaseSchema);