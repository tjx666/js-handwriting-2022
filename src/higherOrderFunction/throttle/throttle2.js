/**
 * 定时器
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function throttle(fn, delay) {
    let isLock = false;
    function throttled(...args) {
        if (!isLock) {
            isLock = true;
            setTimeout(() => {
                isLock = false;
            }, delay);
            return fn.apply(this, args);
        }
    }

    return throttled;
}

export default throttle;
