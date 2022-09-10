import { AprioriMining, Itemset, ItemsetCollection } from "./apriori"

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

  let C = AprioriMining.mine(db, L, 80)

  console.log({
    result: L,
    confidence: C.map((val) => ({
      ...val,
      X: val.X.log(),
      Y: val.Y.map((y) => y),
    })),
  })
}

test()
