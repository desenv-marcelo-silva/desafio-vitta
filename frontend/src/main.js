import Vue from 'vue'
import App from './App.vue'

import Toasted from 'vue-toasted';

import "../node_modules/sakura.css/css/normalize.css"
import "../node_modules/sakura.css/css/sakura.css"

Vue.config.productionTip = false
Vue.use(Toasted, { duration: 1500, position: 'top-center', keepOnHover: true});

new Vue({
  render: h => h(App),
}).$mount('#app')
