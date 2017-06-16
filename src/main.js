
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import routes from './routes'
Vue.use(VueRouter);
Vue.use(VueResource);


// // 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  routes: routes
});

window.__lendApp__ = new Vue({
  el: '#app',
  	   router,
  render: h => h(App)
});




