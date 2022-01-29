const app = require("express").Router();
const User = require("../models/User.model");
const responses = require("../utils/responses");
const jwt = require("jsonwebtoken");

app.post("/signup", async (req, res) => {
	try {
		const valid_keys = ["email", "password", "name"];

		// required fields
		for (const key of valid_keys) {
			if (!req.body[key])
				return responses.fail(res, (message = `${key} is required`));
		}

		//Destruct
		const { name, email, password } = req.body;

		// Check existing email
		if (await User.exists({ email }))
			return responses.fail(res, "email", (message = "email exist"));

		// Create new User
		await User.create({ name, email, password }).then((data) => {
			return responses.success(res, { name, email });
		});
	} catch (error) {
		return responses.error(res, error);
	}
});

app.post("/signin", async (req, res) => {
	try {
		const valid_keys = ["email", "password"];

		for (const key of valid_keys) {
			if (!req.body[key])
				return responses.fail(res, (message = `${key} is required`));
		}

		// Destruct
		const { email, password } = req.body;

		// Get User
		await User.findOne({ email }).then((data) => {
			if (data) {
				let payload = jwt.sign(
					{ email: data.email, id: data._id },
					process.env.SECRET_TOKEN,
				);

				return responses.success(res, {
					token: payload,
					user: { email: data.email, name: data.name, isAdmin: data.isAdmin },
				});
			}
		});
	} catch (error) {
		return responses.error(res, error);
	}
});

app.post("/validate", (req, res) => {
	try {
		jwt.verify(
			JSON.parse(req.body.token),
			process.env.SECRET_TOKEN,
			(err, decoded) => {
				if (err) return new Error("Token not valid");

				User.findById(decoded.id).then((data) => {
					if (data) {
						data.password = undefined;
						return responses.success(res, { isAuth: true, data });
					} else throw new Error("Not authenticated");
				});
			},
		);
	} catch (error) {
		return responses.error(res, error.message);
	}
});

module.exports = app;
