import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    testTimeout: 10000,
    setupFiles: ["./src/setupTests.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
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
