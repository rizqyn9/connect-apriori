import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["./index.ts"],
  splitting: false,
})
