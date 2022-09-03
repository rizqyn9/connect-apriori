import { Itemset } from "./Itemset"

export class AssociationRule {
  public X: Itemset
  public Y: Itemset
  public Support = 0.0
  public Confidence = 0.0

  constructor() {
    this.X = new Itemset()
    this.Y = new Itemset()
  }

  toString() {
    return (
      this.X.toStringNoSupport() +
      " => " +
      this.Y.toStringNoSupport() +
      " (Support: " +
      this.Support.toFixed(2) +
      "%, " +
      " Confidence: " +
      this.Confidence.toFixed(2) +
      "%)"
    )
  }
}
