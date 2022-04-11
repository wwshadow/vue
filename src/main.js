import Vue from 'vue'
import App from './App.vue'
import {
  Button, Radio, Container, Main, Header, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownItem,
  DropdownMenu, Row, Card, Col, Table, TableColumn, Input, Autocomplete, Link
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 这里通过ipmport 进行按需引入 Vue.use进行使用，这样的方法适合在大的项目中使用  
// 按需引入是有点麻烦 小项目尽量使用全局
import "./assets/less/index.less"
import router from '../router'
import store from '../store'
// import echarts from 'echarts'
import '../api/mock.js'




// Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Link)
Vue.use(Card)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Autocomplete)

import axios from 'axios';
Vue.prototype.$axios = axios
// Vue.prototype.$axios = axios.create({
//   baseURL: "http://192.168.10.130:8100",
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   }
// })
axios.defaults.baseURL = "http://192.168.10.130:8100"
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}
// import http from 'axios'
// Vue.prototype.$http = http
new Vue({
  router,
  store,
  App,
  render: h => h(App),
}).$mount('#app');
