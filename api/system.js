import http from '@/common/http/index.js';

export function getExample(params, options = {} ) {
	return http.get('/api/getexample', Object.assign({
		'params': params
	}, options) );
}

export function postExample(params, options = {}) {
	return http.post('/api/postexample', params, option);
}