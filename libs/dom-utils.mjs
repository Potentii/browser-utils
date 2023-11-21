import {Rect, Vector2} from '@potentii/geometry-utils';
import {MathUtils} from "@potentii/math-utils";


export default class DomUtils{


	/**
	 *
	 * @param {HTMLElement} el1
	 * @param {HTMLElement} el2
	 * @param {Vector2} [pos]
     * @param {boolean} [offsetParents]
	 * @return {Vector2}
	 */
	static relativePosition(el1, el2, pos = new Vector2(), offsetParents = false){
		if(!el1)
			return pos;

		pos.x += el1.offsetLeft ?? 0;
		pos.y += el1.offsetTop ?? 0;

		if(el1 == el2)
			return pos;

        const parentProperty = offsetParents ? 'offsetParent' : 'parentElement';

		return DomUtils.relativePosition(el1[parentProperty], el2, pos, offsetParents);
	}


	/**
	 *
	 * @param {HTMLElement} el1
	 * @param {Function<Element,boolean>} predicate
	 * @param {Vector2} pos
     * @param {boolean} [offsetParents]
	 * @return {Vector2}
	 */
	static relativePositionByPredicate(el1, predicate, pos = new Vector2(), offsetParents = false){
		if(!el1)
			return pos;

		pos.x += el1.offsetLeft ?? 0;
		pos.y += el1.offsetTop ?? 0;

		if(predicate.call(null, el1))
			return pos;

        const parentProperty = offsetParents ? 'offsetParent' : 'parentElement';

		return DomUtils.relativePositionByPredicate(el1[parentProperty], predicate, pos, offsetParents);
	}


	/**
	 *
	 * @param {HTMLElement} child
	 * @param {Function<HTMLElement,boolean>} predicate
	 * @param {boolean} [skipFirst]
     * @param {boolean} [offsetParents]
	 * @return {?HTMLElement}
	 */
	static getParentUsingPredicate(child, predicate, skipFirst = false, offsetParents = false){
		if(!child)
			return null;
		if(!skipFirst && !!predicate.call(null, child))
			return child;

        const parentProperty = offsetParents ? 'offsetParent' : 'parentElement';
		return DomUtils.getParentUsingPredicate(child[parentProperty], predicate, false, offsetParents);
	}


    /**
     * Get all the parents from a given element in a list. The first is the element itself (or its direct parent if skipFirst = true), and the last is the root of the node tree.
     * @param {HTMLElement} el
     * @param {boolean} [skipFirst]
     * @param {boolean} [offsetParents]
     * @return {HTMLElement[]}
     */
    static getBackwardsLineage(el, skipFirst = false, offsetParents = false){
        const parentProperty = offsetParents ? 'offsetParent' : 'parentElement';
        const lineage = [];
        let currEl = skipFirst ? el?.[parentProperty] : el;
        if(!currEl)
            return lineage;
        do{
            lineage.push(currEl);
        } while (!!(currEl = currEl[parentProperty]));

        return lineage;
    }

    /**
     * Get all the parents from a given element in a set. If skipFirst = true, the element itself will not be in the set.
     * @param {HTMLElement} el
     * @param {boolean} [skipFirst]
     * @param {boolean} [offsetParents]
     * @return {Set<HTMLElement>}
     */
    static getBackwardsLineageSet(el, skipFirst = false, offsetParents = false){
        const parentProperty = offsetParents ? 'offsetParent' : 'parentElement';
        const lineageSet = new Set();
        let currEl = skipFirst ? el?.parentElement : el;
        if(!currEl)
            return lineageSet;
        do{
            lineageSet.add(currEl);
        } while (!!(currEl = currEl[parentProperty]));

        return lineageSet;
    }


    /**
     * Get the first common parent of two elements, or null if there is no common parent (in the case that the elements are in different node trees).
     * @param {HTMLElement} el1
     * @param {HTMLElement} el2
     * @param {boolean} [offsetParents]
     * @return {?HTMLElement}
     */
    static getCommonParent(el1, el2, offsetParents = false){
        const parentProperty = offsetParents ? 'offsetParent' : 'parentElement';
        if(!el1 || !el2)
            return null;
        if(!el1 == !el2)
            return el1[parentProperty];
        if(el1 == el2[parentProperty])
            return el1;
        if(el2 == el1[parentProperty])
            return el2;

        const el1Parents = DomUtils.getBackwardsLineageSet(el1, false, offsetParents);
        return DomUtils.getParentUsingPredicate(el2, el2Parent => el1Parents.has(el2Parent), false, offsetParents);
    }


	/**
	 *
	 * @param {HTMLElement} el
     * @param {boolean} [offsetParent]
	 * @return {Vector2}
	 */
	static getPositionOnParent(el, offsetParent = false){
        const parentProperty = offsetParent ? 'offsetParent' : 'parentElement';
		return DomUtils.relativePosition(el, el[parentProperty], offsetParent);
	}


    /**
     * Build an elements matrix (of rows and columns) ordered by their position relative to the root element.
     * @param {HTMLElement} root
     * @param {string} selectorQuery
     * @param {number} [deviation]
     * @return {HTMLElement[][]}
     */
    static getElementsMatrix(root, selectorQuery, deviation = 0) {
        const selectedItems = [...root.querySelectorAll(selectorQuery)]
            .map(selected => ({ selected: selected, offset: DomUtils.relativePosition(selected, root, undefined, true) }))
            .sort((i1, i2) => (i1.offset.x + i2.offset.y) - (i1.offset.x + i2.offset.y));

        const matrix = [];
        let row = 0;
        let column = 0;
        let firstItemOfCurrRow = null;

        for (let item of selectedItems) {
            if(!firstItemOfCurrRow)
                firstItemOfCurrRow = item;

            if(!MathUtils.moreOrLess(item.offset.y, firstItemOfCurrRow.offset.y, MathUtils.clamp(deviation, 0, Number.MAX_SAFE_INTEGER))){
                row++;
                column = 0;
                firstItemOfCurrRow = null;
            }

            if(!matrix[row])
                matrix[row] = [];

            matrix[row][column] = item.selected;
            column++;
        }

        return matrix;
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