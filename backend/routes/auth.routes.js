const app = require("express").Router();
const User = require("../models/User.model");

app.get("/", (req, res) => {
	res.json({
		test: "auth",
	});
});

app.post("/signup", async (req, res) => {
	try {
		const valid_keys = ["email", "password", "name"];

		// required fields
		for (const key of valid_keys) {
			if (!req.body[key]) throw new Error(`${key} is required !`);
		}

		//Destruct
		const { name, email, password } = req.body;

		// Check existing email
		if (await User.exists({ email })) throw new Error("Email exist");

		// Create new User
		await User.create({ name, email, password }).then((res) => {
			console.log(res);
		});

		res.status(201).json({
			data: { name, email },
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			err: error.message,
		});
	}
});

module.exports = app;
