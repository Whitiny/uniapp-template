# 注意事项
1. uniapp api 都是类小程序 api，参数嵌套导致编码不便、可读性差等问题，对常用 api 做了一些封装，挂载到 Vue 原型上。可见 main.js
	- `this.$utils`：toast、modal等交互反馈api，节流、防抖，数据类型校验
	- `this.$uRoute`：路由跳转api，可将Object参数自动拼接到url上（仅支持原始类型，复杂数据应通过 EventChannel 进行交互）
	- `this.$u`：uView封装api，正则校验、时间格式化等（不推荐使用节流、防抖函数，uView没有使用闭包封装，且模块化是单例模式，多个节流会共用timer，可能导致冲突）[文档地址](https://www.uviewui.com/js/intro.html)


# 主要集成的组件、库

1. `uView`：uni-app 目前最全面的组件、工具库 [文档地址](https://www.uviewui.com/)
2. `colorUi`：一个纯 css 库，以 class 类名来替代繁复的 css 编写 [插件地址](https://ext.dcloud.net.cn/plugin?id=239)
3. `mescroll`：下拉刷新、上拉加载、回到顶部（仅 app、h5、微信小程序，其他小程序平台性能不够理想）[文档地址](https://www.mescroll.com/uni.html)
4. `luch-request`：基于 promise 封装的 http 请求库 [文档地址](https://www.quanzhan.co/luch-request/guide/3.x/#example)
5. `qiun-data-charts`：数据可视化图表组件 [文档地址](http://doc.ucharts.cn/2222316)

# 分包
| 包名		| 定义			| 说明							| 
|--			|--				|--								|
| main		| 主包			| 首页、登录等					|
| article	| 资讯、文章		| 用到富文本 u-parse 组件的模块	|
| form		| form表单		| 用到 u-form 等表单组件的模块	|
| other		| 其他			| 								|
