import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Reg from './components/Registered.vue';
import Index from './views/Index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '主页',
      },
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
      meta: {
        title: 'reg',
      },
    },
  ],
});
