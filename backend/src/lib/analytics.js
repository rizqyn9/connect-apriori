import Analytics from "../models/Analytics.js"

const ANALYTICS_LABEL = "analytics"

const updateOneProduct = async (data) => {
  try {
    await checkExistAnalytics()

    const dataAnalytics = await getAnalytics()
  } catch (error) {
    console.error(error)
  }
}

const checkExistAnalytics = () =>
  new Promise(async (res, rej) => {
    try {
      if (!(await Analytics.exists({ label: ANALYTICS_LABEL }))) {
        await Analytics.create({
          label: ANALYTICS_LABEL,
          products: [],
          transaction: [],
        }).then(() => res())
      }
      res()
    } catch (error) {
      rej(error)
    }
  })

const getAnalytics = async () => {
  try {
    return await Analytics.findOne({ label: ANALYTICS_LABEL }).then(
      (data, err) => {
        if (err) throw new Error("Data not found")
        return data
      }
    )
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export { updateOneProduct }
