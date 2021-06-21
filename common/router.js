import utils from './utils.js';

function route(url, params = {}, options = {}, routeFn) {
	return new Promise((resolve, reject) => {
		
		if(!isString(url)) url = '' + url;
		
		let index = url.indexOf('?'),
			urlParams = index !== -1? utils.obj2UrlParams(params, '') : utils.obj2UrlParams(params);
		
		if(index !== url.length - 1) url += '&';	
		
		let opts = {
			'url': url + urlParams,
			success: (res) => resolve(res),
			fail: (err) => reject(err),
			...options
		};

		uni[routeFn](opts);
	})
}

/**
 * 跳转到应用内的某个页面
 * @param {String}  url 页面的路径
 * @param {Object}  params 传递到下个页面的参数
 * @param {Object}  options 其他配置
 * @return {Object,Promise}
 */
export function navigateTo(url, params = {}, options = {}) {
	return route(url, params, options, 'navigateTo');
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param {String}  url 页面的路径
 * @param {Object}  params 传递到下个页面的参数
 * @return {Object,Promise}
 */
export function redirectTo(url, params = {}) {
	return route(url, params, undefined, 'redirectTo');
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {String}  url 页面的路径
 * @param {Object}  params 传递到下个页面的参数
 * @return {Object,Promise}
 */
export function reLaunch(url, params = {}) {
	return route(url, params, undefined, 'reLaunch');
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {String}  url 页面的路径
 * @return {Object,Promise}
 */
export function switchTab(url) {
	return route(url, undefined, undefined, 'switchTab');
}


/**
 * 关闭当前页面，返回上一页面或多级页面
 * @param {Number}  delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 * @param {Object}  options 其他配置
 */
export function navigateBack(delta, options = {}) {
	uni.navigateBack({
		'delta': delta,
		...options
	})
}
