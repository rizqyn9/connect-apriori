const isValidKeyRequest = (compare = [], req) => {
  for (const key of compare) {
    if (!req.body[key]) throw new Error(`${key} is required`)
  }
}

export { isValidKeyRequest }
