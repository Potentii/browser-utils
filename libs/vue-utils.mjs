export default class VueUtils{

	/**
	 *
	 * @param {HTMLElement} el
	 * @return {?VueComponent}
	 */
	static getVueComponent(el){
		let comp = /*el?.__vnode?.dynamicChildren?.[0]?.el?.__vueParentComponent?.parent;
		if(!comp)
			comp =*/ el?.__vnode?.dynamicChildren?.[0]?.component?.parent;
		return comp;
	}
	
}