// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(IconsPlugin)
//Validation
import {ValidationProvider} from 'vee-validate/dist/vee-validate.full.esm';
import {ValidationObserver} from 'vee-validate';
import {required} from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('required', required);
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
//store
import store from "./store";
//mixin
import userMixin from './mixins/user-mixins'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mixins: [userMixin],
  store,
  components: {App},
  template: '<App/>'
})
