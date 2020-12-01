import Vue from 'vue'
import App from './App'
import '@/style/index.scss'
import network from './utils/network.js'

Vue.config.productionTip = false
Vue.prototype.$network = network // 网络请求封装

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
