import getIn, { parsePropPathStrToArray } from './getIn.js';
import { isMergeableObject } from './utils.js';

/**
 * @param {Object} object
 * @param {string|Array<string|number>} path
 * @param {any} value
 * @returns {Object}
 */
function setIn(object, path, value) {
    if (!(Array.isArray(path) || typeof path === 'string')) {
        throw TypeError(`The path: ${path} is neither array nor string!`);
    }

    if (!isMergeableObject(object)) return object;
    const propPath = Array.isArray(path) ? path : parsePropPathStrToArray(path);
    if (propPath.length === 0) return object;

    // 这部分逻辑使用类似链表的遍历逻辑性能会更好，不过思路不如直接用 getIn 直观
    for (let i = 0; i < propPath.length - 1; i++) {
        const currentValue = getIn(object, propPath.slice(0, i + 1));
        if (!isMergeableObject(currentValue)) {
            const preValue = getIn(object, propPath.slice(0, i));
            const currentProp = propPath[i];
            const nextProp = propPath[i + 1];
            const isIndex = !isNaN(Number.parseInt(nextProp));
            preValue[currentProp] = isIndex ? [] : {};
        }
    }

    const lastProp = propPath.at(-1);
    const lastObject = getIn(object, propPath.slice(0, propPath.length - 1));
    lastObject[lastProp] = value;
    return object;
}

export default setIn;
