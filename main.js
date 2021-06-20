import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

import store from './store'
Vue.prototype.$store = store

const setting = require('@/common/setting.js');
Vue.prototype.$setting = setting;

import utils from '@/common/utils.js';
Vue.prototype.$utils = utils;

import * as router from '@/common/router.js';
Vue.prototype.$uRoute = router;

const app = new Vue({
	store,
    ...App
})
app.$mount()
