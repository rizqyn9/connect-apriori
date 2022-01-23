require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoConnect } = require("./utils/mongoConnect");

const app = express();

app.use(cookieParser());
// application/json
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	// console.log(req.cookies);
	// console.log(req.headers);
	next();
});

// Auth
app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/products", require("./routes/product.routes"));
app.use("/admin", require("./routes/admin.routes"));

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
