import ImageKit from "imagekit"

import { config } from "@/constant/config"

const imagekit = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE,
  publicKey: config.IMAGEKIT_PUBLIC,
  urlEndpoint: config.IMAGEKIT_ENDPOINT,
})

async function upload(imgBase64: string, fileName: string) {
  return await imagekit.upload({
    file: imgBase64,
    fileName: fileName,
  })
}

export const imageKitController = {
  upload,
}
