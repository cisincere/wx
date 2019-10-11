import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UserInfo from './components/UserInfo.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'home',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: UserInfo,
      meta: {
        title: 'about',
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
  ],
});
