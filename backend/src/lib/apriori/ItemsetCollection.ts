import { Itemset } from "./Itemset"

export class ItemsetCollection extends Array {
  constructor() {
    super()
  }

  getUniqueItems() {
    let uniqueItems = new Itemset()

    for (var index in this) {
      let itemset = this[index]
      for (var i = 0; i < itemset.length; i += 1) {
        if (!uniqueItems.includes(itemset[i])) {
          uniqueItems.push(itemset[i])
        }
      }
    }

    return uniqueItems
  }

  findSupport(itemset: Itemset) {
    let matchCount = 0
    for (var index in this) {
      let is = this[index]

      if (is.includesItemset(itemset)) {
        matchCount += 1
      }
    }

    // console.log({ itemset, matchCount })

    let support = (matchCount / this.length) * 100.0
    return support
  }

  clear() {
    this.length = 0
  }

  toString() {
    return this.join("\n")
  }

  toDataJSON() {
    return this.map((x: Itemset) => ({
      menu: x,
      support: x.Support,
    }))
  }
}
