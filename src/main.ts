import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// eslint-disable-next-line import/order
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// eslint-disable-next-line import/order
import axios from 'axios';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

router.beforeEach((to, from, next) => {
  if (to.meta.content) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
