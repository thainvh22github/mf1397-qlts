import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import vi from 'element-plus/es/locale/lang/vi'

import { DatePicker } from 'ant-design-vue';
import 'element-plus/dist/index.css';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(DatePicker);

app.use(ElementPlus, {
    locale: vi,
})
app.use(ElementPlus);
app.mount('#app');




