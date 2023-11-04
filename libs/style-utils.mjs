export default class c{

    /**
     *
     * @param {HTMLElement} el
     * @param {string} cssPropertyName The property name in css (i.e. 'font-style', '--my-variable', etc)
     * @param {?string} [pseudoElementSelector] The pseudo element selector to match (i.e. ':after', ':before', etc), or null to match the real element
     * @return {string} The computed value for the property
     */
    static getRenderedStyleForProperty(el, cssPropertyName, pseudoElementSelector = null){
        return window.getComputedStyle(el, pseudoElementSelector).getPropertyValue(cssPropertyName)
    }

}