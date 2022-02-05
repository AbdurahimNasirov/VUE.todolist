import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$url = {
  todos: "http://localhost:3000/todos"
}
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
