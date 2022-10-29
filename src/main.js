import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import vi from 'element-plus/es/locale/lang/vi'
import { DatePicker } from 'ant-design-vue';
import 'element-plus/dist/index.css';
import 'ant-design-vue/dist/antd.css';
import TheLogin from '../src/components/TheLogin.vue'
import PropertyList from '../src/view/property/PropertyList.vue'
import WriteUpAsset from '../src/view/property/WriteUpAsset/WriteUpAssetList.vue'
import {createRouter, createWebHistory} from 'vue-router'
import { VueSessionStorage } from 'vue-sessionstorage';

const app = createApp(App);

app.use(DatePicker);
app.use(ElementPlus, {
    locale: vi,
})
app.use(ElementPlus);
app.use(VueSessionStorage);
const routes = [
    { path: '/', component: TheLogin },
    { path: '/property-list', component: PropertyList },
    { path: '/up-asset-list', component: WriteUpAsset },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
  
app.use(router).mount('#app');




