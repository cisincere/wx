import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';


Vue.config.productionTip = false;
Vue.config.devtools = true;

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
