import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"], // Fix it with new build rule
  clean: true,
  minify: true,
  tsconfig: "./tsconfig.build.json",
});
