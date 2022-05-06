/**
 * @param {Array<any>} args
 */
function _generateKey(args) {
    return args.map((arg, i) => `${i}:${arg}`).join(',');
}

/**
 * @param {Function} fn
 * @param {()}
 */
function memoize(fn, generateKey = _generateKey) {
    const cache = new Map();
    const memoized = function (...args) {
        const key = generateKey(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
    memoized.cache = cache;
    return memoized;
}

export default memoize;
