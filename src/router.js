import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home.vue'
import UserLogin from './components/UserManagement/UserLogin'
import Register from './components/UserManagement/Register'
import MyRG from './components/UserManagement/MyRG'
import MyInfo from './components/UserManagement/MyRG/MyInfo'
import ChangePass from './components/UserManagement/MyRG/ChangePass'
import FindPass from './components/UserManagement/FindPass'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import HomePage from './components/HomePage'
import GoodsDetails from './components/GoodsManagement/GoodsDetails'
import MyOrder from './components/Myorder/MyOrder'

import Background from './views/backgroud/Background'
import AddGoods from './views/backgroud/GoodsManagement/AddGoods'
import FindGoods from './views/backgroud/GoodsManagement/FindGoods'
import AddGoodsType from './views/backgroud/GoodsType/AddGoodsType'
import FindGoodsType from './views/backgroud/GoodsType/FindGoodsType'
import FindGoodsDesc from './views/backgroud/GoodsDesc/FindGoodsDesc'
import Cms from './views/backgroud/ContentManagement/CMS'
import Categories from './views/backgroud/ContentManagement/Categories'
import OrderManagement from './views/backgroud/OrderManagement/OrderManagement'
import TongjiNumber from './views/backgroud/InforSta/TongjiNumber'
import UserList from './views/backgroud/UserManagement/UserList'

Vue.use(Router)

const router = new Router({
  // 配置路由匹配规则
  routes: [{
      path: '/',
      redirect: '/home', //路由重定向,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/background',
      redirect: '/background/addGoods' //路由重定向
    },
    {
      path: '/myRG',
      redirect: '/myRG/myInfo' //路由重定向
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: UserLogin
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/goodsDetails',
      name: 'goodsDetails',
      component: GoodsDetails,
    },
    {
      path: '/myRG',
      name: 'myRG',
      component: MyRG,
      children: [ // 嵌套子路由
        {
          path: '/myRG/myInfo',
          name: 'myInfo',
          component: MyInfo,
          meta: {
            isLogin: true
          }
        },
        {
          path: '/myRG/changePass',
          name: 'changePass',
          component: ChangePass
        },
        {
          path: '/myRG/myOrder',
          name: 'myOrder',
          component: MyOrder,
        }
      ]
    },
    {
      path: '/findPass',
      name: 'findPass',
      component: FindPass
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/background',
      name: 'background',
      component: Background,
      children: [ // 嵌套子路由
        {
          path: '/background/addGoods',
          name: 'addGoods',
          component: AddGoods
        },
        {
          path: '/background/findGoods',
          name: 'findGoods',
          component: FindGoods
        },
        {
          path: '/background/addGoodsType',
          name: 'addGoodsType',
          component: AddGoodsType
        },
        {
          path: '/background/findGoodsType',
          name: 'findGoodsType',
          component: FindGoodsType
        },
        {
          path: '/background/findGoodsDesc',
          name: 'findGoodsDesc',
          component: FindGoodsDesc
        },
        {
          path: '/background/cms',
          name: 'cms',
          component: Cms
        },
        {
          path: '/background/categories',
          name: 'categories',
          component: Categories
        },
        {
          path: '/background/orderManagement',
          name: 'orderManagement',
          component: OrderManagement
        },
        {
          path: '/background/tongjiNumber',
          name: 'tongjiNumber',
          component: TongjiNumber
        },
        {
          path: '/background/userList',
          name: 'userList',
          component: UserList
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  //获取用户登录成功后储存的登录标志
  let getFlag = sessionStorage.getItem("Flag");
  //如果登录标志存在且为isLogin，即用户已登录
  if (getFlag === "isLogin") {
    //设置vuex登录状态为已登录
    store.state.isLogin = true;
    next()
    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (to.path == '/userLogin') {
      next({
        path: '/myRG/myInfo'
      }) 
    }else if(to.path == '/register'){
      sessionStorage.removeItem("Flag");
      sessionStorage.setItem("LoginUsername","您好,请登录");
      sessionStorage.removeItem("token");
      sessionStorage.setItem("state","注册");
      next({
        path: '/'
      })
    }
    //如果登录标志不存在，即未登录
  } else {
    //用户想进入需要登录的页面，则定向回登录界面
    if (to.meta.isLogin) {
      next({
        path: '/userLogin',
      })
      //用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }
  }
});

router.afterEach(route => {
  window.scroll(0, 0);
});

export default router;
