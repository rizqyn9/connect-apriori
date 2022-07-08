import Analytics from "../models/Analytics"

const ANALYTICS_LABEL = "analytics"

const updateOneProduct = async (data) => {
  try {
    await checkExistAnalytics()

    const dataAnalytics = await getAnalytics()
  } catch (error) {
    console.error(error)
  }
}

const checkExistAnalytics = (): Promise<void> =>
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

const getAnalytics = async () =>
  await Analytics.findOne({ label: ANALYTICS_LABEL }).then(
    (data) => data ?? Promise.reject("Data not found")
  )

export { updateOneProduct }
