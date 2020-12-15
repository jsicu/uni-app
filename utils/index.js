/**
 * @Author: 老林头
 * @Date: 2020-12-9 17:38:26
 * @lastAuthor:
 * @lastChangeDate:
 * @description:  公告方法
 */
import { JSEncrypt } from './jsencrypt/jsencrypt.min.js';

/** 
 * @method 文本加密
 * @for utils/index
 * @param [String] word 未加密文本
 * @return 已加密文本
 */
export function rsaEncrypt(word) {
	const encrypt = new JSEncrypt();
	try {
		let publicKey = uni.getStorageSync('publicKey');
		encrypt.setPublicKey(publicKey);
		return JSON.stringify(word) // 原文返回
		// return encrypt.encrypt(JSON.stringify(word)); // 加密返回
	} catch (e) {
		uni.redirectTo({
			url: '/pages/index/index'
		});
	}
}
