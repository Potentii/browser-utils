import DomUtils from "./dom-utils.mjs";
import StyleUtils from "./style-utils.mjs";

const PROBE_INPUT_VALUE_RECT_SPAN_CLASS = '__probeutils__probeInputTextWidth__span';

export default class ProbeUtils{

    /**
     *
     * @param {HTMLInputElement} inputEl
     * @return {Rect}
     */
    static probeInputValueRect(inputEl){
        let span = document.querySelector(`.${PROBE_INPUT_VALUE_RECT_SPAN_CLASS}`);
        if(!span){
            span = document.querySelector('body').appendChild(document.createElement('span'));
            span.classList.add(PROBE_INPUT_VALUE_RECT_SPAN_CLASS);
        }

        span.style.position = 'absolute';
        span.style.visibility = 'hidden';
        span.style.width = 'auto';
        span.style.height = 'auto';
        span.style.whiteSpace = 'pre-wrap';

        span.style.fontStyle = StyleUtils.getRenderedStyleForProperty(inputEl, 'font-style');
        span.style.letterSpacing = StyleUtils.getRenderedStyleForProperty(inputEl, 'letter-spacing');
        span.style.fontSize = StyleUtils.getRenderedStyleForProperty(inputEl, 'font-size');
        span.style.fontFamily = StyleUtils.getRenderedStyleForProperty(inputEl, 'font-family');

        span.textContent = inputEl.value;

        return DomUtils.getRectUsingElementBounds(span);
    }

}