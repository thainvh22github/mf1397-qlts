import { createApp } from 'vue';
import App from './App.vue';
import tooltip from "../src/directives/tooltip.js";
import "../src/directives/tooltip.css";
const app = createApp(App);
app.directive("tooltip", tooltip);

app.mount('#app');



