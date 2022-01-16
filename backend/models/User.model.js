const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
		required: true,
	},
});

module.exports = model("Users", UserSchema);
