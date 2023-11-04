export default class Base64Utils{

	/**
	 * 
	 * @param {String} str
	 * @returns {String}
	 */
	static stringToBase64(str){
		return btoa(str);
	}


	/**
	 * 
	 * @param {String} base64
	 * @returns {String}
	 */
	static base64ToString(base64){
		return atob(base64);
	}
	
}