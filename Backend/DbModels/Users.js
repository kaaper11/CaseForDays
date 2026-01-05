const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const bcryptjs = require("bcryptjs");


const UserSchema = new Schema({
    nickname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    balance: {type: Number, default: 1000},
    inventory: {type: Array, default: []},
    role: {type: String, default: "normal"},
})


UserSchema.pre("save", function() {
    if (!this.isModified("password")) return;
    this.password = bcryptjs.hashSync(this.password, 10);
})

module.exports = mongoose.model("Users", UserSchema);