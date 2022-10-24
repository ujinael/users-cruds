
import { Plugin } from "vue";
import { vNumbers } from "./vNumbers";

export const globalDirectivesPlugin:Plugin= {
  install(app, ...options) {
    app.directive("numbers",vNumbers)
  },
  }