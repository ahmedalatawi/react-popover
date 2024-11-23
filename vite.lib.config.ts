import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true, tsConfigFilePath: "./tsconfig.lib.json" }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/Popover/index.ts"),
      name: "ReactPopover",
      fileName: "index",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    minify: "terser",
  },
});
