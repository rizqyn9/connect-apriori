const { Schema, model } = require("mongoose");

const CustomerModel = new Schema({
	name: {
		type: String,
	},
	id_customer: {
		type: String,
		unique: true,
	},
});

module.exports = model("Customers", CustomerModel);
