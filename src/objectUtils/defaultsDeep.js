import { isPureObject } from './utils.js';

function _defaultsDeep(object, source) {
    if (!isPureObject(object) || !isPureObject(source)) {
        throw new TypeError('pass argument must be pure Object!');
    }

    for (const [key, value] of Object.entries(source)) {
        if (object[key] === undefined) {
            object[key] = value;
        } else if (isPureObject(object[key]) && isPureObject(value)) {
            _defaultsDeep(object[key], value);
        }
    }
    return object;
}

/**
 * @param {Object} object
 * @param  {Object[]} sources
 * @returns {Object}
 */
export default function defaultsDeep(object, ...sources) {
    for (const source of sources) {
        _defaultsDeep(object, source);
    }
    return object;
}
