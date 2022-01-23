const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
	},
});

module.exports = model("Products", ProductSchema);
