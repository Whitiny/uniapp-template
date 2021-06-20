const setting = require("./common/setting.js");


module.exports = {
	devServer: {
		// 如无效，检查 manifest 文件，其中的 devServer 会覆盖本配置
		proxy: {
			'/proxyUrl': {
				target: setting.proxyUrl, // 只代理开发环境
				changeOrigin: true,
				pathRewrite: {
					'^/proxyUrl': ''
				}
			},
		}
	}
}
