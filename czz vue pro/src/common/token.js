/**
 * 客户端token.js, 用来生成token配合spring session支持multiple browser users
 * Created by jzq1999 on 2017/4/13.
 */

// 生成URL后缀
export function genUrlSuffix() {
	var clientToken = genUuid();
	var urlSuffix = "?_s=" + clientToken;
	try {
		sessionStorage.setItem("clientToken", clientToken);
		sessionStorage.setItem("urlSuffix", urlSuffix);
	} catch(e) {
		alert("您的浏览器可能已禁用Cookie, 请启用Cookie再试一下。");
		return null;
	}
	return urlSuffix;
};

// 获取URL后缀
function getUrlSuffix() {
	var urlSuffix = sessionStorage.getItem("urlSuffix");

	return urlSuffix;
};

// 生成Client Token
function genClientToken() {
	var clientToken = genUuid();
	return clientToken;
};

// 获取Client Token
function getClientToken() {
	var clientToken = sessionStorage.getItem("clientToken");
	return clientToken;
};

// 获取加后缀后的URL
function getSuffixUrl(url) {
	var urlSuffix = getUrlSuffix();
	var newURL = url;
	if(newURL == null) {
		newURL = "";
	}

	if(newURL.indexOf("?") > 0) {
		newURL += urlSuffix.replace("?", "&");
	} else {
		newURL += urlSuffix;
	}

	return newURL;
};

/**
 * 获取登录url对应的加后缀的url
 * isLoginPage: 是否登录页
 */
function getLoginSuffixUrl(url, isLoginPage) {
	var urlSuffix;
	if(isLoginPage == true) {
		urlSuffix = genUrlSuffix();
	} else {
		urlSuffix = getUrlSuffix();
	}

	var loginSuffixUrl = url;
	if(url.indexOf("?") > 0) {
		loginSuffixUrl += urlSuffix.replace("?", "&");
	} else {
		loginSuffixUrl += urlSuffix;
	}

	return loginSuffixUrl;
};

function genUuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for(var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}