import Vue from 'vue'
import App from './App.vue'
import {
  Button, Radio, Container, Main, Header, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownItem,
  DropdownMenu, Row, Card, Col, Table, TableColumn, Input, Autocomplete, Link, Loading, Descriptions, DescriptionsItem
  , Select, Option, OptionGroup, Switch, Dialog, Form, FormItem, RadioGroup,
  DatePicker, Tooltip, Carousel, CarouselItem, Pagination,
} from 'element-ui';
// MessageBox, Message
import 'element-ui/lib/theme-chalk/index.css';
// 这里通过ipmport 进行按需引入 Vue.use进行使用，这样的方法适合在大的项目中使用  
// 按需引入是有点麻烦 小项目尽量使用全局
import "./assets/less/index.less"
import router from '../router'
import store from '../store'
// import echarts from 'echarts'
import '../api/mock.js'
import VueResource from 'vue-resource'



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
Vue.use(Loading)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(RadioGroup)

// Vue.use(Message)

Vue.use(VueResource)


import axios from 'axios';
Vue.prototype.$axios = axios
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$message = Message
// Vue.prototype.$axios = axios.create({
//   baseURL: "http://192.168.10.130:8100",
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   }
// })
axios.defaults.baseURL = "http://esjirainfo.com:8100/jirainfo/v1/"
// axios.defaults.baseURL = "http://192.168.10.130:8100/jirainfo/v1/"
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}
// import http from 'axios'
// Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  App,
  render: h => h(App),
}).$mount('#app');
