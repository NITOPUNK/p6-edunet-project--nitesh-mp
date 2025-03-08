const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRecipes: [mongoose.Schema.Types.ObjectId],
    createdRecipes: [mongoose.Schema.Types.ObjectId]
}, 
{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;