const { Schema, model } = require("mongoose");

const TransactionModel = new Schema({
	transaction_id: {
		type: String,
		required: true,
	},
	creted_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = model("Transactions", TransactionModel);
