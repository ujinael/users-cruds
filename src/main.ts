import { createApp } from "vue";
import { createPinia } from "pinia";
import 'reflect-metadata'
import App from "./App.vue";
import router from "./router";
import {globalComponentsPlugin} from "./components"
import { globalDirectivesPlugin } from "./directives";
const app = createApp(App);
app.use(globalComponentsPlugin)
app.use(globalDirectivesPlugin)
app.use(createPinia());
app.use(router);

app.mount("#app");
