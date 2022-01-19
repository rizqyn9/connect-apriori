const mongoose = require("mongoose");

exports.MongoConnect = async (uri) => {
	return await mongoose
		.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((e) => {
			throw new Error(e);
		});
};

mongoose.connection.on("error", () => {
	console.log("MongoDB connection error");
});

mongoose.connection.on("disconnect", () => {
	console.log("Disconnected from MongoDB");
});
