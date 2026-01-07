const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    rarity: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },

    weaponType: String,
    startrak: { type: Boolean, default: false },
    stan: String,

    pattern: Number,

    czyHolo: { type: Boolean, default: false },
    turniej: String,
    druzyna: String,
    czyZlota: { type: Boolean, default: false },
    rok: Number,
});

module.exports = mongoose.model("Items", ItemSchema);
