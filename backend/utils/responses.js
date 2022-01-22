module.exports = {
	success: (res, data, message = {}, status = 200) => {
		console.log({ data, message });
		return res.json({ status: "success", data });
	},
	fail: (res, data, message = {}, status = 200) => {
		console.log({ data, message });
		return res.json({ status: "fail", data, message });
	},
	error: (res, message, status = 200) => {
		console.log(message);
		return res.json({ status: "error", message });
	},
};
