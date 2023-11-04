import {Rect, Vector2} from '@potentii/geometry-utils';


export default class DomUtils{


	/**
	 *
	 * @param {HTMLElement} el1
	 * @param {HTMLElement} el2
	 * @param {Vector2} [pos]
	 * @return {Vector2}
	 */
	static relativePosition(el1, el2, pos = new Vector2()){
		if(!el1)
			return pos;

		pos.x += el1.offsetLeft ?? 0;
		pos.y += el1.offsetTop ?? 0;

		if(el1 == el2)
			return pos;

		return DomUtils.relativePosition(el1.parentElement, el2, pos);
	}


	/**
	 *
	 * @param {HTMLElement} el1
	 * @param {Function<Element,boolean>} predicate
	 * @param {Vector2} pos
	 * @return {Vector2}
	 */
	static relativePositionByPredicate(el1, predicate, pos = new Vector2()){
		if(!el1)
			return pos;

		pos.x += el1.offsetLeft ?? 0;
		pos.y += el1.offsetTop ?? 0;

		if(predicate.call(null, el1))
			return pos;

		return DomUtils.relativePositionByPredicate(el1.parentElement, predicate, pos);
	}


	/**
	 *
	 * @param {HTMLElement} child
	 * @param {Function<HTMLElement,boolean>} predicate
	 * @param {boolean} [skipFirst]
	 * @return {?HTMLElement}
	 */
	static getParentUsingPredicate(child, predicate, skipFirst = false){
		if(!child)
			return null;
		if(!skipFirst && !!predicate.call(null, child))
			return child;
		return DomUtils.getParentUsingPredicate(child.parentElement, predicate, false);
	}


	/**
	 *
	 * @param {HTMLElement} el
	 * @return {Vector2}
	 */
	static getPositionOnParent(el){
		return DomUtils.relativePosition(el, el.parentElement);
	}


	/**
	 *
	 * @param {HTMLElement} el
	 * @return {Rect}
	 */
	static getRectUsingElementBounds(el){
		const bounds = el.getBoundingClientRect();
		return new Rect(new Vector2(bounds.left, bounds.top), new Vector2(bounds.right, bounds.bottom));
	}


	/**
	 *
	 * @param {HTMLElement} el
	 * @return {Rect}
	 */
	static getRectUsingElementOffsets(el){
		const top = el.offsetTop;
		const left = el.offsetLeft;
		return new Rect(new Vector2(left, top), new Vector2(left + el.offsetWidth, top + el.offsetHeight));
	}

}