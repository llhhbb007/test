import Vue from 'vue'
import App from './App.vue'
import calender from './lib/index'
Vue.use(calender)
new Vue({
  el: '#app',
  render: h => h(App)
})
