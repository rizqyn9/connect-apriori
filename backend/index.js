require("dotenv").config();
const express = require("express");
const app = express();
const { MongoConnect } = require("./utils/mongoConnect");

// Auth
app.use("/auth", require("./routes/auth.routes"));

app.use("*", (req, res) => {
	res.send("Once");
});

// Wait until DB connected
MongoConnect(process.env.MONGO)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Server listening on http://localhost:${process.env.PORT}`);
		});
	})
	.catch((e) => {
		console.log(e);
	});
