const responses = require("../utils/responses");

const app = require("express").Router();

/**
 * Ambil semua transaksi
 */
app.get("/", (req, res) => {
  return responses.success(res, "Success");
});

/**
 * Buat Transaksi baru
 */
app.post("/new", (req, res) => {
  console.log(req.body);
  return responses.success(res, req.body);
});

module.exports = app;
