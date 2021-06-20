let devUrl = '/测试地址',
	prodUrl = '',
	proxyUrl = devUrl;

// #ifdef H5
// 小程序开发工具编译慢，开发过程中可用浏览器调试，如存在跨域问题，配置 webpack 通过 node 服务器代理请求
devUrl = 'proxyUrl;'
// #endif

module.exports = {
	// 开发环境接口 Url
	devUrl,
	// 线上环境接口 Url
	prodUrl,
	// 被代理接口 Url
	proxyUrl
}
