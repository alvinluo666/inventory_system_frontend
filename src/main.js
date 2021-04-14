require('./config');
import { createApp } from 'vue'
import * as all from 'vue';


import App from './App.vue'
import router from './router'
import store from './store'


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import Ripple from './directives/ripple';



import axios from 'axios'
import VueAxios from 'vue-axios'

var vueKeepScroll = require('vue-keep-scroll')
var app=createApp(App)
app.directive('ripple',Ripple)
app.use(VueAxios, axios)
app.use(store).use(router).use(Antd).mount('#app');
