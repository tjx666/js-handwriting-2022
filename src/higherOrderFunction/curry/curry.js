/**
 * 需要递归创建新的闭包
 * @param {Function} fn
 * @param {number} argLength
 * @returns {Function}
 */
function curry(fn, argLength = fn.length) {
    const cachedArgs = [];

    function create(cacheArgs) {
        return function (...args) {
            const totalArgs = [...cacheArgs, ...args];
            if (totalArgs.length >= argLength) {
                return fn.apply(this, totalArgs);
            } else {
                return create(totalArgs);
            }
        };
    }

    return create(cachedArgs);
}

export default curry;
