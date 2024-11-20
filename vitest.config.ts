import { defineConfig } from "vitest/config.js";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
        "**/*.config.{ts,js}",
        "src/test-utils.ts",
        "src/setupTests.ts",
      ],
    },
  },
});
