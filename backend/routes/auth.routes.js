const app = require("express").Router();
const User = require("../models/User.model");

app.get("/", (req, res) => {
	res.send("Auth");
});

app.post("/signup", (req, res) => {
	let errors;
	try {
		const valid_keys = ["email", "password", "username"];

		// required fields
		for (const key of valid_keys) {
			errors = ["key"];
			if (!req.body[key]) throw new Error(`${key} is required !`);
		}

		res.json({
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			err: errors,
		});
	}
});

module.exports = app;
