const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const ItemSchema = new Schema({
    name: {type: String, required: true},
    rarity: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    type: {type: String, required: false},

    weaponType: {type: String, required: false},
    startrak: {type: Boolean, required: false},
    stan : {type: String, required: false},

    pattern: {type: Number, required: false},

    czyHolo: {type: Boolean, required: false},
    turniej: {type: String, required: false},
    druzyna: {type: String, required: false},
    czyZlota: {type: Boolean, required: false},
    rok: {type: Number, required: false},
})

module.exports = mongoose.model("Items", ItemSchema, "items");