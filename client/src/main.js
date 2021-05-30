import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './utils/permission';
import './utils/font-awesome';

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
