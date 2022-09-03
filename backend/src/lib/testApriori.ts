import { AprioriMining, Itemset, ItemsetCollection } from "./apriori-js"

const transactions = [
  ["Americano", "Cappucino", "test"],
  ["Americano"],
  ["Americano", "Cappucino", "test"],
  ["Americano", "Cappucino", "test"],
  ["Americano"],
  ["Cappucino"],
]
function test() {
  let db = new ItemsetCollection()
  transactions.forEach((x) => db.push(Itemset.from(x)))

  let L = AprioriMining.doApriori(db, 10)

  console.log({ result: L })
}

test()
