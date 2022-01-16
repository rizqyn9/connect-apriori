const { Schema, model } = require("mongoose");

const MenuSchema = new Schema({
	menu: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

module.exports = model("Menus", MenuSchema);
