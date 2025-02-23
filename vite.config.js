import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const paths = [
  "src",
  "assests",
  "components",
  "configs",
  "layouts",
  "pages",
  "routers",
  "services",
  "pages",
  "utils",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...paths.reduce((acc,cur) => ({
        ...acc,
        [cur]:`/${cur === "src" ? cur : "src/" + cur}`
        
      }),"")
    }
  },
});
