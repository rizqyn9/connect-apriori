export default {
  success: (res, data, message = {}, status = 200) => {
    // console.log({ data, message })
    return res.json({ status: "success", data, message })
  },
  fail: (res, data, message = {}, status = 200) => {
    // console.log({ data, message });
    return res.json({ status: "fail", data, message })
  },
  error: (res, message, status = 500) => {
    console.log(message)
    return res.json({ status: "error", message })
  },
  forbidden: (res, message, status = 401) => {
    console.log(message)
    return res.json({ status: "forbidden", message })
  },
}
