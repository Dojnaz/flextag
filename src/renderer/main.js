import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import AsyncComputed from 'vue-async-computed'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MetaAPI from './MetaAPI'
import ResizableBox from 'vue-resizable-box'

Vue.component('font-awesome-icon', FontAwesomeIcon);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ResizableBox)
Vue.use(AsyncComputed)

/* eslint-disable no-new */
let vue = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

window.vue = vue
window.Vue = Vue
