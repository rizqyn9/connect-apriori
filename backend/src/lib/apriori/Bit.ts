import { Itemset } from "./Itemset"
import { ItemsetCollection } from "./ItemsetCollection"

export class Bit {
  static findSubsets(itemset: Itemset, n: number) {
    let subsets = new ItemsetCollection()

    let subsetCount = Math.pow(2, itemset.length)
    for (var i = 0; i < subsetCount; i++) {
      if (n == 0 || Bit.getOnCount(i, itemset.length) == n) {
        let binary = Bit.decimalToBinary(i, itemset.length)

        let subset = new Itemset()
        for (var charIndex = 0; charIndex < binary.length; charIndex++) {
          if (binary[binary.length - charIndex - 1] == "1") {
            subset.push(itemset[charIndex])
          }
        }
        subsets.push(subset)
      }
    }

    return subsets
  }

  static getBit(value: number, position: number) {
    let bit = value & Math.pow(2, position)
    return bit > 0 ? 1 : 0
  }

  static decimalToBinary(value: number, length: number) {
    let binary = ""
    for (var position = 0; position < length; position++) {
      binary = Bit.getBit(value, position) + binary
    }
    return binary
  }

  static getOnCount(value: number, length: number) {
    let binary = Bit.decimalToBinary(value, length)

    let onCount = 0
    for (var i = 0; i < binary.length; i += 1) {
      if (binary[i] == "1") {
        onCount += 1
      }
    }

    return onCount
  }
}
