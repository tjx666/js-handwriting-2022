/**
 * 时间戳比较
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function throttle(fn, delay) {
    let lastExecuteTime;

    function throttled(...args) {
        const now = Date.now();

        if (lastExecuteTime === undefined) {
            lastExecuteTime = now;
            return fn(...args);
        } else {
            const duration = now - lastExecuteTime;
            if (duration >= delay) {
                lastExecuteTime = now;
                return fn(...args);
            }
        }
    }

    return throttled;
}

export default throttle;

