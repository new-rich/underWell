import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus';//为vue3项目特别更新的版本
import 'element-plus/dist/index.css';

import * as Icons from '@element-plus/icons-vue'
for (let iconName in Icons) {
    createApp(App).component(iconName, Icons[iconName])
}

const app = createApp(App)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')
