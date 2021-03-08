import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import {Menu,Layout,message,Input,Button,Row,Col,Table} from 'ant-design-vue';
import api from './request/api/index';
import cookies from "cookies-js";
import { SelectorUI } from './plugin/LisUI/index.js'

const app = createApp(App as object);
app.use(router).use(Menu).use(Layout).use(Input).use(Button).use(Row).use(Col).use(Table).use(SelectorUI);
app.mount('#app');
app.config.globalProperties.$router = router;
app.config.globalProperties.$message = message;
app.config.globalProperties.$api = api;
app.config.globalProperties.$cookies = cookies;
