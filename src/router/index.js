import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/homePage'
import Profile from '../views/profile'
import ItemCard from '../views/itemCard'
import Login from '../views/login'
import CreateAccount from '../views/createAccount'
import GoodDetail from '../views/goodsDetails'
import Order from "@/views/Order_details";
import Template from "@/views/template";
import Trade from "@/views/Trade";
import UploadPicture from "@/views/UploadPicture";
import ChooseCategory from "@/views/ChooseCategory";
import PaySuccess from "@/views/PaySuccess";

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
    path: '/goodsDetail',
    name: 'GoodsDetail',
    component: GoodDetail
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/template',
    name: 'Template',
    component: Template
  },
  {path: '/trade',
  name: 'Trade',
  component: Trade
  },
  {
    path: '/UploadPicture',
    name: 'UploadPicture',
    component: UploadPicture
  },
  {
    path: '/ChooseCategory',
    name: 'ChooseCategory',
    component: ChooseCategory
  },{
        path: '/pay/success',
        name: 'pay-success',
        component: PaySuccess
    }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
