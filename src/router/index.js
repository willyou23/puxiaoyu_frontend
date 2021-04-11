import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/homePage'
import Profile from '../views/profile'
import ItemCard from '../views/itemCard'
import Login from '../views/login'
import CreateAccount from '../views/createAccount'
import OrderDetail from '../views/orderDetails'
import GoodDetail from '../views/goodsDetails'
import template from "@/views/template";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },{
    path: '/homePage',
    name: 'HomePage',
    component: HomePage
  },{
    path: '/profile',
    name: 'Profile',
    component: Profile
  },{
    path: '/itemCard',
    name: 'ItemCard',
    component: ItemCard
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/createAccount',
    name: 'CreateAccount',
    component: CreateAccount
  },{
    path: '/orderDetail',
    name: 'OrderDetail',
    component: OrderDetail
  },{
    path: '/goodsDetail',
    name: 'GoodsDetail',
    component: GoodDetail
  },{
    path: '/template',
    name: 'Template',
    component: template
  }
]

const router = new VueRouter({
  routes
})

export default router
