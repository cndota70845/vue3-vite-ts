import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'ant-design-vue/dist/antd.css'
import router from './router'

const app = createApp(App as any)
app.use(router)
app.mount('#app')
app.config.globalProperties.$router = router

