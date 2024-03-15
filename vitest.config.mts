import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    setupFiles: ["vitest-test-setup.ts"],
    include: ["src/**/*.spec.ts"],
    coverage: {
      provider: "v8",
    },
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
});
