const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
	menu: {
		type: String,
		required: true,
	},
	harga: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
	},
	image: {
		type: Object,
	},
});

module.exports = model("Products", ProductSchema);
