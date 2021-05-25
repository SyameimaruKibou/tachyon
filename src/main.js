import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueSocketIO from "vue-socket.io";
import httpRequest from './utils/http-request'
import './quasar'
import store from './store'

Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_SOCKETIO_URL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}));

Vue.prototype.$routerObj = router
Vue.prototype.$http = httpRequest

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
