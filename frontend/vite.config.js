import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: {
         "@helpers": path.resolve(__dirname, "src/helpers"),
         "@components": path.resolve(__dirname, "src/components"),
         "@assets": path.resolve(__dirname, "src/assets"),
         "@views": path.resolve(__dirname, "src/views"),
      },
   },
});
