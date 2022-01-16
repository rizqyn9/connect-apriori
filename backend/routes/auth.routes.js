const app = require("express").Router();

app.get("/", (req, res) => {
	res.send("Auth");
});

module.exports = app;
