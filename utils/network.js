/**
 * @Author: 老林头
 * @Date: 2020-11-30 11:14:22
 * @lastAuthor:
 * @lastChangeDate:
 * @description: 网络请求封装
 */
const BASEURL = 'http://localhost:4000/' // 后端地址

module.exports = (params) => {
	let url = params.url;
	let method = params.method;
	let header = params.header || {};
	let data = params.data || {};
	//	请求方式 GET POST
	if (method) {
		method = method.toUpperCase(); //	小写转大写
		if (method == "POST") {
			header = {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
	}
	uni.getStorage({
		key: 'userInfo',
		success: (res) => {
			console.log(res.data);
			header.token = res.data.token
		},
		fail: (err) => {
			uni.redirectTo({
				// navigateTo redirectTo
				url: '/pages/index/index'
			});
		}
	});
	// if () {

	// } else{

	// }
	//	发起请求 加载动画
	if (!params.hideLoading) {
		uni.showLoading({
			title: "加载中"
		})
	}
	//	发起网络请求
	uni.request({
		url: BASEURL + url,
		method: method || "GET",
		header: header,
		data: data,
		dataType: "json",
		sslVerify: false, //	是否验证ssl证书
		success: res => {
			if (res.statusCode && res.statusCode != 200) {
				//	api错误
				uni.showModal({
					content: res.errMsg
				})
				return;
			}
			// if(res.data.code === 0) {
			// 	//	api错误
			// 	uni.showModal({
			// 		content: res.data.message
			// 	})
			// 	return;
			// }
			typeof params.success == "function" && params.success(res.data.data);
		},
		fail: err => {
			uni.showModal({
				content: err.errMsg
			})
			typeof params.fail == "function" && params.fail(err.data);
		},
		complete: (e) => {
			// console.log("请求完成");
			uni.hideLoading()
			typeof params.complete == "function" && params.complete(e.data);
			return;
		}
	})
}
