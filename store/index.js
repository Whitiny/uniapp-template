import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 导航栏高度
		 */
		navHeight: 44,
		/**
		 * 状态栏高度
		 */
		statusHeight: 0,
	},
	mutations: {
		/**
		 * 记录导航栏、状态栏高度
		 */
		SAVE_NAVBAR_HEIGHT: function(state, {
			navHeight,
			statusHeight
		}) {
			state.navHeight = navHeight;
			state.statusHeight = statusHeight;
		},
	},
	actions: {
		/**
		 * 计算导航栏高度
		 */
		calcNavBar: function({
			commit
		}) {
			uni.getSystemInfo({
				success: function(e) {
					let statusHeight = 0,
						navHeight = 44;
		
					// #ifndef MP
					statusHeight = e.statusBarHeight;
					navHeight = e.statusBarHeight + 44;
					// #endif
		
					// #ifdef MP-WEIXIN
					statusHeight = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					navHeight = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
		
					// #ifdef MP-ALIPAY
					statusHeight = e.statusBarHeight;
					navHeight = e.statusBarHeight + e.titleBarHeight;
					// #endif
		
					commit('SAVE_NAVBAR_HEIGHT', {
						navHeight,
						statusHeight
					})
				}
			})
		},
	}
})

export default store
