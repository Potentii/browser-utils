let useNamespace = false;
let namespace = null;

let useAppKey = false;
let appKey = null;

let useEnv = false;

let enableLog = false;

let separator = '-';


/**
 * 
 * @returns {String}
 */
function getRootStorageKey(){
	let key = [];
	if(!!useNamespace)
		key.push(namespace);
	
	if(!!useAppKey)
		key.push(appKey);
	
	if(!!useEnv)
		key.push(process.env.NODE_ENV);
	
	return key.join(separator);
}

/**.
 * 
 * @param {String} key
 * @returns {String}
 */
function getFullKey(key){
	const root = getRootStorageKey();
	return root.trim().length 
		? root + separator + key 
		: key;
}



export default class StorageUtils{


	/**
	 *
	 * @param {Boolean} flag
	 */
	static useNamespace(flag){
		useNamespace = !!flag;
	}
	/**
	 *
	 * @param {String} newNamespace
	 */
	static setNamespace(newNamespace){
		namespace = newNamespace;
	}
	
	
	/**
	 *
	 * @param {Boolean} flag
	 */
	static useAppKey(flag){
		useAppKey = !!flag;
	}
	/**
	 *
	 * @param {String} newAppKey
	 */
	static setAppKey(newAppKey){
		appKey = newAppKey;
	}
	
	
	/**
	 * 
	 * @param {Boolean} flag
	 */
	static useEnv(flag){
		useEnv = !!flag;
	}

	/**
	 *
	 * @param {Boolean} flag
	 */
	static enableLog(flag){
		enableLog = !!flag;
	}

	/**
	 *
	 * @param {String} newSeparator
	 */
	static changeSeparator(newSeparator){
		separator = newSeparator;
	}
	
	

	/**
	 *
	 * @param {String} key
	 * @return {String}
	 */
	static retrieve(key){
		const path = getFullKey(key);
		if(enableLog)
			console.log(`STORAGE: RETRIEVING FROM "${path}"`);
		return localStorage.getItem(path);
	}


	/**
	 *
	 * @param {String} key
	 * @return {?Object|?Array}
	 */
	static retrieveObj(key){
		const str = StorageUtils.retrieve(key);
		if(!str || str.trim().length == 0)
			return null;
		return JSON.parse(str);
	}


	/**
	 *
	 * @param {String} key
	 * @param {String} value
	 * @return {void}
	 */
	static save(key, value){
		const path = getFullKey(key);
		if(enableLog)
			console.log(`STORAGE: WRITING TO "${path}"`);
		localStorage.setItem(path, value);
	}

	
	/**
	 *
	 * @param {String} key
	 * @param {Object|Array} value
	 * @return {void}
	 */
	static saveObj(key, value){
		StorageUtils.save(key, !value ? null : JSON.stringify(value));
	}


	/**
	 *
	 * @param {String} key
	 * @return {void}
	 */
	static delete(key){
		const path = getFullKey(key);
		if(enableLog)
			console.log(`STORAGE: DELETING "${path}"`);
		localStorage.removeItem(path);
	}
	

	/**
	 *
	 * @param {String} key
	 * @return {String}
	 */
	static deleteAndRetrieve(key){
		const value = StorageUtils.retrieve(key);
		StorageUtils.delete(key);
		return value;
	}

}