/**
 * 需要递归创建新的闭包
 * @param {Function} fn
 * @param {number} argLength
 * @returns {Function}
 */
function curry(fn, argLength = fn.length) {
    return function curried(...args) {
        if (args.length >= argLength) {
            return fn.apply(this, args);
        } else {
            return function _curried(..._args) {
                return curried(...args, ..._args);
            };
        }
    };
}

export default curry;
