import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Reg from './components/Registered.vue';
import Index from './views/Index.vue';
import Login from './components/Login.vue';
import bm from './components/BackgroundMusic.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '主页',
        index: 0,
      },
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      meta: {
        title: '注册',
        index: 2,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录',
        index: 1,
      },
    },
  ],
});
