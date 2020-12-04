import Vue from 'vue'
import App from './App.vue'
import "../node_modules/sakura.css/css/normalize.css"
import "../node_modules/sakura.css/css/sakura.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')