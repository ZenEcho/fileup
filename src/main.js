import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from './components/Navbar.vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueFullPage from 'vue-fullpage.js'
import 'fullpage.js/dist/fullpage.min.css' // 引入fullpage.js的样式文件


const app = createApp(App)
app.use(router)
app.use(VueFullPage)

app.mount('#box')

app.component('Navbar', Navbar); // 全局注册 Navbar 组件
