/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign MDN Object.assign}
 * @param {Object} target
 * @param  {Object[]} sources
 * @returns {Object}
 */
function objectAssign(target, ...sources) {
    for (const source of sources) {
        // 拷贝可枚举的非 symbol 属性
        for (const [key, val] of Object.entries(source)) {
            target[key] = val;
        }

        // 拷贝可枚举的 symbol 属性
        for (const symbol of Object.getOwnPropertySymbols(source)) {
            if (Object.getOwnPropertyDescriptor(source, symbol).enumerable) {
                target[symbol] = source[symbol];
            }
        }
    }

    return target;
}

export default objectAssign;

