import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

const app = createApp(App)
app.use(Antd).mount('#app')
// app.config.globalProperties.$message = message;
