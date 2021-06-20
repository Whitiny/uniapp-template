import {
	devUrl,
	prodUrl
} from '@/common/setting.js';

import {
	confirmModal
} from '../util.js';

function httpInit(http) {
	http.setConfig((config) => {
		config.baseURL = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;
		config.custom = {
			// 是否在请求头挂载 token
			auth: true,
		};
		return config;
	});

	http.interceptors.request.use((config) => {
		// 挂载token
		if (config.custom.auth) {
			// config.header.Authorization = 'Bearer ' + uni.getStorageSync('token');
		}
		
		return config;
	}, (config) => {
		return Promise.reject(config);
	});

	http.interceptors.response.use(async (res) => {

		if (res && res.data) {
			switch (res.data.code) {
				case 200:
					return res;
					break;

				case 401:
					let res = await confirmModal("登录状态已过期，请重新登录");
					if (res.confirm) {
						uni.reLaunch({
							url: "/pagesC/home/login.vue"
						})
					}
					break;

				default:
					break;
			}
		}

		return Promise.reject(res);
	}, (err) => {
		return Promise.reject(err);
	})
}


import Request from './luch-request/index.js';
const http = new Request();

httpInit(http);

export {
	http as	default,
	httpInit
}
