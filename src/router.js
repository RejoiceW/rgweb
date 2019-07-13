import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserLogin from './components/UserManagement/UserLogin'
import Register from './components/UserManagement/Register'
import MyRG from './components/UserManagement/MyRG'
import MyInfo from './components/UserManagement/MyRG/MyInfo'
import ChangePass from './components/UserManagement/MyRG/ChangePass'
import FindPass from './components/UserManagement/FindPass'
import Background from './views/backgroud/Background'
import AddGoods from './views/backgroud/GoodsManagement/AddGoods'
import FindGoods from './views/backgroud/GoodsManagement/FindGoods'

Vue.use(Router)

export default new Router({
  linkActiveClass: '',

  // 配置路由匹配规则
  routes: [
    {
      path: '/', 
      redirect: '/home' //路由重定向
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: UserLogin
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/myRG',
      name: 'myRG',
      component: MyRG,
      children:[  // 嵌套子路由
        {
          path: '/myRG/myInfo',
          name: 'myInfo',
          component: MyInfo
        },
        {
          path: '/myRG/changePass',
          name: 'changePass',
          component: ChangePass
        }
      ]
    },
    {
      path: '/findPass',
      name: 'findPass',
      component: FindPass
    },
    {
      path: '/background',
      name: 'background',
      component: Background,
      children:[  // 嵌套子路由
        {
          path: '/background/addGoods',
          name: 'addGoods',
          component: AddGoods
        },
        {
          path: '/background/findGoods',
          name: 'findGoods',
          component: FindGoods
        }
      ]
    }
  ]
})
