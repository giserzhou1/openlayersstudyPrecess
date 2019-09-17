import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(iView);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
