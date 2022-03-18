const TransactionModel = require("../models/Transaction.model");
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
  const processedData = {};
  try {
    const { order, transaction } = req.body;

    if (Array.isArray(order)) {
      order.map((val) => {
        let keyMenu = val.id.split("-")[1];
        if (processedData[keyMenu]) {
          processedData.quantity += 1;
        } else {
          processedData[keyMenu] = { quantity: 1 };
        }
      });
    }

    console.log(processedData);
    console.log(req.body);

    return responses.success(res, req.body);
  } catch (error) {
    console.log(error);
    return responses.error(res, "err");
  }
});

module.exports = app;
