/**
 * 显示消息提示框
 * @param {String} title 提示内容
 * @param {Number} duration 持续时间
 * @param {Object}  options 其他配置
 * @return {Object,Promise}
 */
function toast(title = '', duration = 1500, options = {}) {
	let opts = Object.assign({
		'title': title,
		'icon': "none",
		'duration': duration,
	}, options);

	uni.showToast(opts);
}

/**
 * 显示 loading 提示框
 * @param {String} title 提示内容
 * @param {Object}  options 其他配置
 * @return {Object,Promise}
 */
function loading(title = '', options = {}) {
	let opts = Object.assign({
		'title': title,
		'mask': true
	}, options)

	uni.showLoading(opts);
}

/**
 * 显示模态弹窗
 * @param {String} content 提示内容
 * @param {Object}  options 其他配置
 * @return {Object,Promise}
 */
function modal(content = '', options = {}) {
	return new Promise((resolve, reject) => {
		let opts = Object.assign({
			'title': '提示',
			'content': content,
			success: function(e) {
				resolve(e)
			},
			fail: function(err) {
				reject(err)
			}
		}, options);

		uni.showModal(opts)
	})
}

/**
 * 显示只有确定按钮的模态框
 * @param {String} content 提示内容
 * @param {Object}  options 其他配置
 * @return {Object,Promise}
 */
function confirmModal(content = '', options = {}) {
	return modal(content, Object.assign({
		'showCancel': false
	}, options));
}

/**
 * 底部向上弹出操作菜单
 * @param {Array<String>} itemList 按钮的文字数组
 * @param {Object}  options 其他配置
 * @return {Object,Promise}
 */
function actionSheet(itemList = [], options = {}) {
	return new Promise((resolve, reject) => {
		let opts = Object.assign({
			'itemList': itemList,
			success: function(e) {
				resolve(e)
			},
			fail: function(err) {
				reject(err)
			}
		}, options);

		uni.showActionSheet(opts);
	})
}

/**
 * 基于promise的setTimeout封装函数，结合async、await语法糖，可提供十分便捷的使用方式，避免回调地狱
 * @param {Number} delay 延迟毫秒数，默认值 300
 * @return {Object,Promise}
 * @example sleep().then(() =>{ ... })
 * @example await sleep(); ...;
 */
function sleep(delay = 300) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true)
		}, delay)
	});
}

/**
 * 验证变量类型是否符合预期，不是的话尝试进行类型转换
 * @param {any}  val 变量
 * @param {String,Function}  test 为String类型时，与val的typeof结果进行验证，为Function类型时，验证执行结果的Boolean值
 * @param {any}  defaultVal 验证失败的返回值，默认为空字符串
 * @param {Function}  covertFn 类型转换函数
 * @example dataCorrect('123', 'number', 0, Number)
 */
function dataCorrect(val = null, test, defaultVal = "", convertFn) {

	if (typeof test === 'string' && typeof val === test) {
		return val;
	} else if (typeof test === 'function' && test(val)) {
		return val;
	}

	try {
		if (typeof convertFn === "function") {
			return convertFn(val);
		}
	} catch (e) {
		console.error(e);
	}

	return defaultVal;
}

function checkNetwork(showToast = true) {
	return new Promise((resolve, reject) => {
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType == 'none' && showToast) toast('当前网络不可用,请检查网络设置');
				resolve(res);
			},
			fail: function(err) {
				reject(err);
			}
		})
	});
}


/**
 * 将对象类型参数构造为url字符串类型：?a=x&b=y
 * @param {Object} params JSON对象类型参数集
 * @return {String}
 */
function obj2UrlParams(params = {}) {
	let res = '?';

	try {
		for (var key in params) {
			if (params.hasOwnProperty(key)) {
				res += key + '=' + params[key] + '&';
			}
		}
	} catch (e) {
		//TODO handle the exception
	}

	res = res.substr(0, res.length - 1);
	return res;
}

/**
 * URL参数转对象
 * @param {String} url
 * @return {Object}
 */
function urlParams2Obj(url) {
	if (typeof url !== 'string') return {};

	if (url.indexOf('?') != -1) {
		let arr = url.split('?')[1]
	}
	let arr = url.split('&')
	let obj = {}
	for (let i of arr) {
		obj[i.split('=')[0]] = i.split('=')[1]
	}
	return obj
}

import * as luchUtils from './http/luch-request/utils.js';

export default {
	...luchUtils,

	sleep,
	toast,
	loading,
	modal,
	confirmModal,
	actionSheet,

	dataCorrect,
	checkNetwork,

	obj2UrlParams,
	urlParams2Obj
};
