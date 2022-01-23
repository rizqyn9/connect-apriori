const app = require("express").Router();
const User = require("../models/User.model");
const responses = require("../utils/responses");

app.get("/", (req, res) => {
	res.send("okay");
});

app.get("/accounts", async (req, res) => {
	try {
		User.find().then((val) => {
			return responses.success(res, val);
		});
	} catch (error) {}
});

module.exports = app;
