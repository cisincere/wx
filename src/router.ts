import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Reg from './components/Registered.vue';
import Index from './views/Index.vue';
import Canvas4Vue from './components/Canvas4Vue.vue';

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
    {
      path: '/cv',
      name: 'Canvas4Vue',
      component: Canvas4Vue,
      meta: {
        title: 'Canvas4Vue',
      },
    },
  ],
});
