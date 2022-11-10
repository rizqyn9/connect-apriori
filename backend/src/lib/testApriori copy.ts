import _ from "lodash"

type ItemSet = {
  items: string[]
  support: number
  banyakTransaksi: number
}

class Apriori {
  totalTransaction: number
  k1: ItemSet[] = []
  k2: ItemSet[] = []
  constructor(private support: number, private data: string[][]) {
    this.totalTransaction = data.length
    this.getFirst()
    this.get2()

    // console.log({ transanctin: this.totalTransaction, k1: this.k1, k2: this.k2 })
  }

  getFirst() {
    this.data.flat(1).forEach((x) => {
      const idx = this.k1.findIndex((y) => y.items.includes(x))
      if (idx < 0) this.k1.push({ items: [x], banyakTransaksi: 1, support: 0 })
      else this.k1[idx].banyakTransaksi += 1
    })
  }

  get2() {
    this.generateAsociation()
    this.k1.forEach((x) => {
      const idx = this.k2.findIndex((y) => _.intersection(y.items, x.items))
      if (idx > 0) {
        this.k2[idx].banyakTransaksi += 1
      } else {
        this.k2.push({
          banyakTransaksi: 1,
          items: x.items,
          support: 0,
        })
      }
    })
  }

  generateAsociation() {
    let a: unknown[] = []
    for (let x = 0; x < this.k1.length; x++) {
      for (let y = x + 1; y < this.k1.length; y++) {
        const c = this.k1[y]?.items
        c && a.push(c)
      }
    }
    console.log({ a })
  }
}

const transactions = [
  ["Americano", "Cappucino", "test"],
  ["Americano"],
  ["Americano", "Cappucino", "test"],
  ["Americano", "Cappucino", "test"],
  ["Americano"],
  ["Cappucino"],
]

//https://lodash.com/docs/4.17.15#intersection

new Apriori(0.5, transactions)
