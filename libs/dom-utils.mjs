import { Vector2 } from '@potentii/geometry-utils';



export default class DomUtils{


	/**
	 *
	 * @param {HTMLElement} el1
	 * @param {HTMLElement} el2
	 * @param {Vector2} pos
	 * @return {Vector2}
	 */
	static relativePosition(el1, el2, pos = new Vector2()){
		if(!el1)
			return pos; // TODO should return null in this case?

		pos.x += el1.offsetLeft;
		pos.y += el1.offsetTop;

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
			return pos; // TODO should return null in this case?

		pos.x += el1.offsetLeft;
		pos.y += el1.offsetTop;

		if(predicate.call(null, el1))
			return pos;

		return DomUtils.relativePositionByPredicate(el1.parentElement, predicate, pos);
	}


	/**
	 *
	 * @param {HTMLElement} child
	 * @param {Function<HTMLElement,boolean>} predicate
	 * @param {boolean} skipFirst
	 * @return {?HTMLElement}
	 */
	static getParentUsingPredicate(child, predicate, skipFirst = false){
		if(!child)
			return null;
		if(!skipFirst && !!predicate.call(null, child))
			return child;
		return DomUtils.getParentUsingPredicate(child.parentElement, predicate, false);
	}

}