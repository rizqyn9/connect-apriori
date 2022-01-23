const app = require("express").Router();
const User = require("../models/User.model");
const responses = require("../utils/responses");

app.get("/", (req, res) => {
	res.send("user");
});

app.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		User.findById(id.toString()).then((data) => {
			if (data) return responses.success(res, data);
			else return responses.fail(res, "User not found");
		});
	} catch (error) {}
});

module.exports = app;
