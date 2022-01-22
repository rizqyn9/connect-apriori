require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoConnect } = require("./utils/mongoConnect");

const app = express();

// application/json
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	// console.log(req.headers);
	next();
});

// Auth
app.use("/auth", require("./routes/auth.routes"));

app.use("*", (req, res) => {
	res.send("Once");
});

const PORT = process.env.PORT || 5000;
// Wait until DB connected
MongoConnect(process.env.MONGO)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server listening on http://localhost:${PORT}`);
		});
	})
	.catch((e) => {
		console.log(e);
	});
