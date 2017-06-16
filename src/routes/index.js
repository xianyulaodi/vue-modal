/**
 * @file
 * Created by jiangjunhuan@yy.com on 17/2/7.
 */

import index from '../views/index.vue'
import detail from '../views/detail.vue'
import dreamMoney from '../views/dreamMoney.vue'

// 根目录
const rootPath = '';

// 页面路由
const routes = [
  {
  	path: '/', 
    component: index,
    name: 'index'
  },
  {
    path: '/detail/:id',
    component: detail, 
    name: 'detail',
  },
  {
  	path: '/money',
  	component: dreamMoney, 
  	name: 'money',
  },
].map(route => {
  route.path = rootPath + route.path;
  return route;
});
// 404 页
// routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
