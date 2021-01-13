import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import {Menu,Layout,message,Input,Button,Row,Col,Table} from 'ant-design-vue'
import api from './api/http'

const app = createApp(App as object)
app.use(router).use(Menu).use(Layout).use(Input).use(Button).use(Row).use(Col).use(Table)
app.mount('#app')
app.config.globalProperties.$router = router
app.config.globalProperties.$message = message
app.config.globalProperties.$api = api
