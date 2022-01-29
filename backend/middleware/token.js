const jwt = require("jsonwebtoken");
const responses = require("../utils/responses");

const VerifyToken = (req, res, next) => {
	try {
		console.log("dfd");
		if (req.headers["x-access-token"]) {
			jwt.verify(
				req.headers["x-access-token"],
				process.env.SECRET_TOKEN,
				(err, validate) => {
					if (err) throw new Error("Token not valid");
					req.user = validate;
					next();
				},
			);
		} else new Error("Not validated");
	} catch (error) {
		return responses.fail(res, error.message);
	}
};

module.exports = {
	VerifyToken,
};
