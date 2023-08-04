import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from './components/Navbar.vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the CSS file

import VueFullPage from 'vue-fullpage.js'
import 'fullpage.js/dist/fullpage.min.css' // 引入fullpage.js的样式文件



const app = createApp(App)
app.use(router)
app.use(VueFullPage)
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: "bottom-right", //位置
    timeout: 3000, //时间
    closeOnClick: true, //关闭按钮
    pauseOnFocusLoss: true, //失焦暂停
    pauseOnHover: true, //悬浮暂停
    draggable: true, //拖拽
    draggablePercent: 0.6, //拖拽百分比
    showCloseButtonOnHover: false, //仅在悬停时显示关闭按钮
    hideProgressBar: false, //隐藏进度条
    closeButton: "button",
    icon: true,
    rtl: false
});

app.mount('#box')

app.component('Navbar', Navbar); // 全局注册 Navbar 组件
