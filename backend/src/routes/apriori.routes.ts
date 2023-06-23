// #1 Import semua kebutuhan untuk melakukan aksi apriori
import { Router } from "express"
import * as transactionController from "@/controller/transaction.controller"
import { AprioriMining, Itemset, ItemsetCollection } from "@/lib/apriori"

const router = Router()

// #2 Definisikan edpoint untuk kebutuhan perhitungan apriori
router.get("/", async (req, res, next) => {
  // #3 Ambil permintaan yang diberikan pengguna
  const { confidence = 100, support = 30 } = req.query

  // #4 Ambil semua riwayat transaksi
  const transactions = await transactionController.TransactionModel.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "orders.productId",
        foreignField: "_id",
        as: "products",
      },
    },
  ])

  // #4 Pengolah data riwayat transaksi
  // Agar data mentah dapat diterima sesuai aturan library apriori
  const products = transactions.reduce<unknown[][]>((prev, curr) => {
    // @ts-expect-error
    const productsInTransaction = curr.products.reduce((prev1, curr1) => {
      return [...prev1, curr1.menu]
    }, [])
    return [...prev, productsInTransaction]
  }, [])

  const db = new ItemsetCollection()

  // 5 Masukkan data yang dikelola kedalam database apriori sebelum proses perhitungan
  products.forEach((x) => db.push(Itemset.from(x)))

  // 6 Melakukan proses perhitungan apriori untuk mengumpulkan daftar menu yang unique
  const apriori = AprioriMining.doApriori(db, Number(support))

  // 7 Melakukan proses kalkulasi perhitungan nilai Suport dan Confidence
  const resultConfidence = AprioriMining.mine(db, apriori, Number(confidence))

  // 8 Mengirimkan data dari semua proses perhitungan apriori
  res.json({
    payload: {
      transactions: products,
      apriori: apriori.toDataJSON(),
      confidence: resultConfidence,
    },
  })
})

export default router
