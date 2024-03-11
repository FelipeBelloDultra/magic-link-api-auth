import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  clean: true,
  minify: true,
  tsconfig: "./tsconfig.build.json",
});
