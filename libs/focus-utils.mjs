import DomUtils from "./dom-utils.mjs";

export default class FocusUtils{

    /**
     *
     * @param {HTMLElement} el
     * @param {boolean} strict
     * @return {boolean}
     */
    static isFocused(el, strict = false){
        return document.activeElement === el || (!strict && DomUtils.getParentUsingPredicate(el, currEl => document.activeElement === currEl));
    }

}