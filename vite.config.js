import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import stylusAliasesPlugin from "./plugins/stylus-aliases.js";
import path from "path";
import rupture from "rupture";

const env = loadEnv("", process.cwd(), "");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), stylusAliasesPlugin()],
  server: {
    port: env.PORT,
  },
  css: {
    preprocessorOptions: {
      stylus: {
        use: [rupture()],
      },
    },
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
      "~": path.join(__dirname, "./node_modules"),
    },
  },
});
